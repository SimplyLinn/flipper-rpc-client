import {
  Application,
  Context,
  Converter,
  ReflectionKind,
  DeclarationReflection,
  MappedType,
  ReflectionType,
  SourceReference,
  ConversionFlags,
} from 'typedoc';

declare module 'typedoc' {
  export interface TypeDocOptionMap {
    internalModule: string;
  }
}

export function load(app: Readonly<Application>) {
  const declaration = app.options.getDeclaration('modifierTags');
  if (
    declaration &&
    'defaultValue' in declaration &&
    Array.isArray(declaration.defaultValue)
  ) {
    declaration.defaultValue.push('@unroll');
  }
  if (app.options.isSet('modifierTags')) {
    app.options.setValue('modifierTags', [
      ...app.options.getValue('modifierTags'),
      '@unroll',
    ]);
  }
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (context: Context, reflection: DeclarationReflection) => {
      if (
        reflection.kindOf(ReflectionKind.TypeAlias) &&
        reflection.type instanceof MappedType &&
        reflection.comment?.hasModifier('@unroll')
      ) {
        reflection.comment.removeModifier('@unroll');
        const symbol = reflection.project.getSymbolFromReflection(reflection);
        if (!symbol) {
          return;
        }
        const type = context.checker.getDeclaredTypeOfSymbol(symbol);
        const props = type.getProperties();
        if (props.length <= 0) return;
        const typeSymbol = type.symbol;
        const typeLiteral = new DeclarationReflection(
          typeSymbol.name,
          ReflectionKind.TypeLiteral,
          reflection,
        );
        const sources = typeSymbol.getDeclarations()?.map((d) => {
          const sourceFile = d.getSourceFile();
          const pos = sourceFile.getLineAndCharacterOfPosition(
            d.getStart(sourceFile),
          );
          return new SourceReference(
            sourceFile.fileName,
            pos.line,
            pos.character,
          );
        });
        if (sources) typeLiteral.sources = sources;
        const children: DeclarationReflection[] = (typeLiteral.children = []); // TODO
        type.getProperties().map((p) => {
          const declaration = new DeclarationReflection(
            p.getName(),
            ReflectionKind.Property,
            typeLiteral,
          );
          declaration.conversionFlags =
            ConversionFlags.VariableOrPropertySource;
          declaration.comment = undefined;
          declaration.escapedName = p.getEscapedName();
          declaration.defaultValue = undefined;
          declaration.type = context.converter.convertType(
            context,
            context.checker.getTypeOfSymbol(p),
          );
          children.push(declaration);
        });
        const newReflectionType = new ReflectionType(typeLiteral);
        reflection.type = newReflectionType;
        reflection.comment.modifierTags.add('@unrolled');
      }
    },
  );
}
