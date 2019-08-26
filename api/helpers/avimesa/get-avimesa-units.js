module.exports = {


  friendlyName: 'Get Avimesa units',


  description: '',


  exits: {

    success: {
      outputFriendlyName: 'Avimesa unit data',
    },

  },


  fn: async function ({}) {

    // Send back the result through the success exit.
    return [
      { codeName: 'eAVI_ENG_UNIT_UNKNOWN', base16Value: '0x0000', base10Value: 0, description: 'Unknown unit type' },
      { codeName: 'eAVI_ENG_UNIT_AMPS_DC', base16Value: '0x0001', base10Value: 1, description: 'Amperage, DC' },
      { codeName: 'eAVI_ENG_UNIT_AMPS_AC', base16Value: '0x0002', base10Value: 2, description: 'Amperage, AC' },
      { codeName: 'eAVI_ENG_UNIT_VOLTS_DC', base16Value: '0x0003',  base10Value: 3, description: 'Volts, DC' },
      { codeName: 'eAVI_ENG_UNIT_VOLTS_AC', base16Value: '0x0004',  base10Value: 4, description: 'Volts, AC' },
      { codeName: 'eAVI_ENG_UNIT_C', base16Value: '0x0010', base10Value: 16,  description: 'Temperature, Celsius' },
      { codeName: 'eAVI_ENG_UNIT_F', base16Value: '0x0011', base10Value: 17,  description: 'Temperature, Fahrenheit' },
      { codeName: 'eAVI_ENG_UNIT_K', base16Value: '0x0012', base10Value: 18,  description: 'Temperature, Kelvin' },
      { codeName: 'eAVI_ENG_UNIT_PSI', base16Value: '0x0020', base10Value: 32,  description: 'Pressure, pound-force per square inch' },
      { codeName: 'eAVI_ENG_UNIT_PA', base16Value: '0x0021',  base10Value: 33,  description: 'Pressure, pascal' },
      { codeName: 'eAVI_ENG_UNIT_BAR', base16Value: '0x0022', base10Value: 34,  description: 'Pressure, bar' },
      { codeName: 'eAVI_ENG_UNIT_TORR', base16Value: '0x0023',  base10Value: 35,  description: 'Pressure, torr' },
      { codeName: 'eAVI_ENG_UNIT_ATM', base16Value: '0x0024', base10Value: 36,  description: 'Pressure, atmosphere' },
      { codeName: 'eAVI_ENG_UNIT_PSID', base16Value: '0x0028',  base10Value: 40,  description: 'Pressure, pound-force per square inch, differential' },
      { codeName: 'eAVI_ENG_UNIT_PAD', base16Value: '0x0029', base10Value: 41,  description: 'Pressure, pascal, differential' },
      { codeName: 'eAVI_ENG_UNIT_BARD', base16Value: '0x002A',  base10Value: 42,  description: 'Pressure, bar, differential' },
      { codeName: 'eAVI_ENG_UNIT_TORRD', base16Value: '0x002B', base10Value: 43,  description: 'Pressure, torr, differential' },
      { codeName: 'eAVI_ENG_UNIT_ATMD', base16Value: '0x002C',  base10Value: 44,  description: 'Pressure, atmosphere, differential' },
      { codeName: 'eAVI_ENG_UNIT_SEC', base16Value: '0x0030', base10Value: 48,  description: 'Seconds' },
      { codeName: 'eAVI_ENG_UNIT_HZ', base16Value: '0x0031',  base10Value: 49,  description: 'Hertz' },
      { codeName: 'eAVI_ENG_UNIT_CPM', base16Value: '0x0032', base10Value: 50,  description: 'Cycles Per Minute' },
      { codeName: 'eAVI_ENG_UNIT_METERS', base16Value: '0x0040',  base10Value: 64,  description: 'Meters' },
      { codeName: 'eAVI_ENG_UNIT_METER_PER_SEC', base16Value: '0x0041', base10Value: 65,  description: 'Meters Per Second' },
      { codeName: 'eAVI_ENG_UNIT_METER_PER_SEC2', base16Value: '0x0042',  base10Value: 66,  description: 'Meters Per Second^2' },
      { codeName: 'eAVI_ENG_UNIT_FEET', base16Value: '0x0043',  base10Value: 67,  description: 'Feet' },
      { codeName: 'eAVI_ENG_UNIT_FEET_PER_SEC', base16Value: '0x0044',  base10Value: 68,  description: 'Feet Per Second' },
      { codeName: 'eAVI_ENG_UNIT_FEET_PER_SEC2', base16Value: '0x0045', base10Value: 69,  description: 'Feet Per Second^2' },
      { codeName: 'eAVI_ENG_UNIT_INCHES', base16Value: '0x0046',  base10Value: 70,  description: 'Inches' },
      { codeName: 'eAVI_ENG_UNIT_INCHES_PER_SEC', base16Value: '0x0047',  base10Value: 71,  description: 'Inches Per Second' },
      { codeName: 'eAVI_ENG_UNIT_INCHES_PER_SEC2', base16Value: '0x0048', base10Value: 72,  description: 'Inches Per Second^2' },
      { codeName: 'eAVI_ENG_UNIT_INCHES', base16Value: '0x0049',  base10Value: 73,  description: 'Yards' },
      { codeName: 'eAVI_ENG_UNIT_INCHES_PER_SEC', base16Value: '0x004A',  base10Value: 74,  description: 'Yards Per Second' },
      { codeName: 'eAVI_ENG_UNIT_INCHES_PER_SEC2', base16Value: '0x004B', base10Value: 75,  description: 'Yards Per Second^2' },
      { codeName: 'eAVI_ENG_UNIT_MILLIMETERS', base16Value: '0x004C', base10Value: 76,  description: 'Millimeters' },
      { codeName: 'eAVI_ENG_UNIT_NANOMETERS', base16Value: '0x004D',  base10Value: 77,  description: 'Nanometers' },
      { codeName: 'eAVI_ENG_UNIT_KILOGRAM', base16Value: '0x0050',  base10Value: 80,  description: 'Kilogram' },
      { codeName: 'eAVI_ENG_UNIT_NEWTON', base16Value: '0x0060',  base10Value: 96,  description: 'Newton' },
      { codeName: 'eAVI_ENG_UNIT_JOULE', base16Value: '0x0061', base10Value: 97,  description: 'Joule' },
      { codeName: 'eAVI_ENG_UNIT_WATT', base16Value: '0x0062',  base10Value: 98,  description: 'Watt' },
      { codeName: 'eAVI_ENG_UNIT_LPM', base16Value: '0x0070', base10Value: 112, description: 'Liter Per Minute' },
      { codeName: 'eAVI_ENG_UNIT_GPM', base16Value: '0x0071', base10Value: 113, description: 'Gallon Per Minute' },
      { codeName: 'eAVI_ENG_UNIT_CUBIC_METER', base16Value: '0x0080', base10Value: 128, description: 'Cubic Meter' },
      { codeName: 'eAVI_ENG_UNIT_IPS_PK', base16Value: '0x0100',  base10Value: 256, description: 'Inches Per Second, Peak' },
      { codeName: 'eAVI_ENG_UNIT_IPS_RMS', base16Value: '0x0101', base10Value: 257, description: 'Inches Per Second, RMS' },
      { codeName: 'eAVI_ENG_UNIT_MMS_PK', base16Value: '0x0102',  base10Value: 258, description: 'mm/s, Peak' },
      { codeName: 'eAVI_ENG_UNIT_MMS_RMS', base16Value: '0x0103', base10Value: 259, description: 'mm/s, RMS' },
      { codeName: 'eAVI_ENG_UNIT_G_RMS', base16Value: '0x0104', base10Value: 260, description: 'g, Peak' },
      { codeName: 'eAVI_ENG_UNIT_G_PK', base16Value: '0x0105',  base10Value: 261, description: 'g, RMS'},
      { codeName: 'eAVI_ENG_UNIT_MILS_PK_PK', base16Value: '0x0106',  base10Value: 262, description: 'mils, peak to peak' },
      { codeName: 'eAVI_ENG_UNIT_BOOL', base16Value: '0x1000',  base10Value: 4096,  description: 'Boolean type data, 0 or 1' },
      { codeName: 'eAVI_ENG_UNIT_ON_OFF', base16Value: '0x1001',  base10Value: 4097,  description: 'On/off data, 0 or 1' },
      { codeName: 'eAVI_ENG_UNIT_OPEN_CLOSED', base16Value: '0x1002', base10Value: 4098,  description: 'Open/Closed data, 0 or 1' },
      { codeName: 'eAVI_ENG_UNIT_RUN_HOURS', base16Value: '0x1010', base10Value: 4112,  description: 'Run hours' },
      { codeName: 'eAVI_ENG_UNIT_LATITUDE', base16Value: '0x1020',  base10Value: 4128,  description: 'Latitude' },
      { codeName: 'eAVI_ENG_UNIT_LONGITUDE', base16Value: '0x1021', base10Value: 4129,  description: 'Longitude' },
      { codeName: 'eAVI_ENG_UNIT_REL_HUM', base16Value: '0x1031', base10Value: 4145,  description: 'Relative Humidity' },
      { codeName: 'eAVI_ENG_UNIT_ABS_HUM', base16Value: '0x1032', base10Value: 4146,  description: 'Absolute Humidity' },
      { codeName: 'eAVI_ENG_UNIT_PERCENT', base16Value: '0x1040', base10Value: 4160,  description: 'Percentage' },
      { codeName: 'eAVI_ENG_UNIT_PPM', base16Value: '0x1050', base10Value: 4176,  description: 'Parts per million' },
      { codeName: 'eAVI_ENG_UNIT_PPB', base16Value: '0x1051', base10Value: 4177,  description: 'Parts per billion' },
      { codeName: 'eAVI_ENG_UNIT_PPQ', base16Value: '0x1052', base10Value: 4178,  description: 'Parts per quadrillion' },
      { codeName: 'eAVI_ENG_UNIT_DB', base16Value: '0x1060',  base10Value: 4192,  description: 'Decibels' },
      { codeName: 'eAVI_ENG_UNIT_DBA', base16Value: '0x1061', base10Value: 4193,  description: 'Decibels adjusted' },
      { codeName: 'eAVI_ENG_UNIT_PH', base16Value: '0x1070',  base10Value: 4208,  description: 'pH' },
      { codeName: 'eAVI_ENG_UNIT_NM', base16Value: '0x1080',  base10Value: 4224,  description: 'Torque, Newton Meters' },
      { codeName: 'eAVI_ENG_UNIT_LBF_FT', base16Value: '0x1081',  base10Value: 4225,  description: 'Torque, Pound Foot' },
      { codeName: 'eAVI_ENG_UNIT_NM_PER_SEC2', base16Value: '0x1090', base10Value: 4240,  description: 'Rotating Inertia, Newton Meter per sec^2' },
      { codeName: 'eAVI_ENG_UNIT_OZF_IN_PER_SEC2', base16Value: '0x1091', base10Value: 4241,  description: 'Rotating Inertia, Ounce force inch per sec^2' },
      { codeName: 'eAVI_ENG_UNIT_ADC_COUNTS', base16Value: '0xF000',  base10Value: 61440, description: 'ADC Counts' },
    ];

  }


};

