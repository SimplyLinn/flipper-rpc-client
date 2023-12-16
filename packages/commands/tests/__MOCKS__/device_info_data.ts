export default function deviceInfoData() {
  return {
    device_info_major: '2',
    device_info_minor: '4',
    hardware_model: 'Flipper Zero (MOCK)',
    hardware_uid: '0011223344556677',
    hardware_otp_ver: '2',
    hardware_timestamp: Math.trunc(Date.now() / 1000).toFixed(0),
    hardware_ver: '12',
    hardware_target: '7',
    hardware_body: '9',
    hardware_connect: '6',
    hardware_display: '1',
    hardware_color: '2',
    hardware_region: '0',
    hardware_region_provisioned: '00',
    hardware_name: 'FLIPPER-MOCK',
    firmware_commit: '00112233',
    firmware_commit_dirty: 'false',
    firmware_branch: 'MOCK',
    firmware_branch_num: '0',
    firmware_version: 'FLIPPER-MOCK',
    firmware_build_date: '01-01-1970',
    firmware_target: '7',
    firmware_api_major: '39',
    firmware_api_minor: '2',
    firmware_origin_fork: 'FLIPPER-MOCK',
    firmware_origin_git: 'https://example.com/',
    radio_alive: 'true',
    radio_mode: 'Stack',
    radio_fus_major: '1',
    radio_fus_minor: '2',
    radio_fus_sub: '0',
    radio_fus_sram2b: '16K',
    radio_fus_sram2a: '0K',
    radio_fus_flash: '24K',
    radio_stack_type: '3',
    radio_stack_major: '1',
    radio_stack_minor: '17',
    radio_stack_sub: '3',
    radio_stack_branch: '0',
    radio_stack_release: '2',
    radio_stack_sram2b: '19K',
    radio_stack_sram2a: '14K',
    radio_stack_sram1: '0K',
    radio_stack_flash: '116K',
    radio_ble_mac: '001122334455',
    enclave_valid_keys: '10',
    enclave_valid: 'true',
    system_debug: '0',
    system_lock: '0',
    system_orient: '0',
    system_sleep_legacy: '0',
    system_stealth: '0',
    system_heap_track: '0',
    system_boot: '0',
    system_locale_time: '0',
    system_locale_date: '2',
    system_locale_unit: '0',
    system_log_level: '0',
  };
}