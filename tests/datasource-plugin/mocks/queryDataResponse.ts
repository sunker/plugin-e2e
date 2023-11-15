export const QUERY_DATA_QUERY_A_RESPONSE = {
  results: {
    A: {
      status: 200,
      frames: [
        {
          schema: {
            name: 'A',
            refId: 'A',
            meta: {
              typeVersion: [0, 0],
              custom: {
                queryID: 'd6e9f2d8-15fb-4ba0-88c5-8c791fc67c9a',
                status: 'finished',
              },
              preferredVisualisationType: 'table',
              executedQueryString: 'SELECT eventname FROM event ORDER BY eventname ASC LIMIT 1',
            },
            fields: [
              {
                name: 'eventname',
                type: 'string',
                typeInfo: {
                  frame: 'string',
                  nullable: true,
                },
              },
            ],
          },
          data: {
            values: [['RESULT 1']],
          },
        },
      ],
    },
  },
};

export const QUERY_DATA_ANNOTATION_RESPONSE = {
  results: {
    Anno: {
      status: 200,
      frames: [
        {
          schema: {
            name: 'Anno',
            refId: 'Anno',
            meta: {
              typeVersion: [0, 0],
              custom: {
                queryID: '109f298f-c14f-4c13-84bc-58c8fc98c44e',
                status: 'finished',
              },
              preferredVisualisationType: 'graph',
              executedQueryString: 'SELECT starttime, eventname FROM event ORDER BY eventname ASC LIMIT 5 ',
            },
            fields: [
              {
                name: 'starttime',
                type: 'time',
                typeInfo: {
                  frame: 'time.Time',
                  nullable: true,
                },
              },
              {
                name: 'eventname',
                type: 'string',
                typeInfo: {
                  frame: 'string',
                  nullable: true,
                },
              },
            ],
          },
          data: {
            values: [
              [1209654000000, 1209650400000, 1200943800000, 1209236400000, 1202220000000],
              ['.38 Special', '.38 Special', '.38 Special', '.38 Special', '.38 Special'],
            ],
          },
        },
      ],
    },
  },
};

export const QUERY_DATA_TIMESERIES_RESPONSE = {
  results: {
    A: {
      status: 200,
      frames: [
        {
          schema: {
            name: 'A',
            refId: 'A',
            meta: {
              typeVersion: [0, 0],
              custom: {
                queryID: '69fc6607-163c-4c30-b6e4-d922c10ea43e',
                status: 'finished',
              },
              preferredVisualisationType: 'graph',
              executedQueryString: 'SELECT starttime,eventid,dateid FROM event ORDER BY starttime ASC LIMIT 100',
            },
            fields: [
              {
                name: 'starttime',
                type: 'time',
                typeInfo: {
                  frame: 'time.Time',
                  nullable: true,
                },
              },
              {
                name: 'eventid',
                type: 'number',
                typeInfo: {
                  frame: 'int32',
                },
              },
              {
                name: 'dateid',
                type: 'number',
                typeInfo: {
                  frame: 'int16',
                },
              },
            ],
          },
          data: {
            values: [
              [
                1199196000000, 1199196000000, 1199196000000, 1199197800000, 1199197800000, 1199197800000, 1199199600000,
                1199199600000, 1199199600000, 1199214000000, 1199214000000, 1199214000000, 1199214000000, 1199214000000,
                1199214000000, 1199214000000, 1199214000000, 1199215800000, 1199215800000, 1199215800000, 1199215800000,
                1199217600000, 1199282400000, 1199282400000, 1199284200000, 1199284200000, 1199284200000, 1199284200000,
                1199284200000, 1199284200000, 1199284200000, 1199286000000, 1199286000000, 1199286000000, 1199286000000,
                1199286000000, 1199300400000, 1199300400000, 1199300400000, 1199300400000, 1199300400000, 1199300400000,
                1199300400000, 1199300400000, 1199300400000, 1199302200000, 1199302200000, 1199302200000, 1199302200000,
                1199302200000, 1199304000000, 1199304000000, 1199368800000, 1199368800000, 1199368800000, 1199372400000,
                1199372400000, 1199372400000, 1199372400000, 1199372400000, 1199372400000, 1199386800000, 1199386800000,
                1199386800000, 1199386800000, 1199386800000, 1199386800000, 1199386800000, 1199386800000, 1199386800000,
                1199388600000, 1199388600000, 1199388600000, 1199388600000, 1199390400000, 1199390400000, 1199390400000,
                1199390400000, 1199455200000, 1199455200000, 1199455200000, 1199455200000, 1199455200000, 1199455200000,
                1199455200000, 1199455200000, 1199455200000, 1199455200000, 1199455200000, 1199455200000, 1199457000000,
                1199457000000, 1199457000000, 1199458800000, 1199458800000, 1199458800000, 1199458800000, 1199458800000,
                1199458800000, 1199458800000,
              ],
              [
                3915, 4850, 7117, 4135, 1334, 1376, 2811, 7747, 5807, 5267, 6711, 6440, 1433, 7654, 8621, 7855, 7197,
                6649, 423, 6640, 2099, 1217, 6780, 2509, 2809, 3979, 2286, 4421, 3477, 3449, 2772, 2131, 3766, 6262,
                1766, 521, 7503, 5737, 5006, 2494, 2727, 2824, 5560, 4853, 8678, 2920, 3853, 5475, 6873, 6842, 1738,
                1337, 5763, 2729, 4680, 7381, 6071, 6475, 394, 4373, 6274, 8663, 4711, 5417, 4671, 2043, 5546, 3496,
                6287, 7468, 2841, 5508, 3633, 6120, 744, 2266, 1191, 4053, 8745, 7028, 4808, 6270, 7189, 5494, 6912,
                6491, 5515, 3351, 7778, 3035, 2606, 4394, 1902, 5540, 4609, 982, 4855, 1981, 3696, 1567,
              ],
              [
                1827, 1827, 1827, 1827, 1827, 1827, 1827, 1827, 1827, 1827, 1827, 1827, 1827, 1827, 1827, 1827, 1827,
                1827, 1827, 1827, 1827, 1827, 1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828,
                1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828, 1828,
                1828, 1829, 1829, 1829, 1829, 1829, 1829, 1829, 1829, 1829, 1829, 1829, 1829, 1829, 1829, 1829, 1829,
                1829, 1829, 1829, 1829, 1829, 1829, 1829, 1829, 1829, 1829, 1830, 1830, 1830, 1830, 1830, 1830, 1830,
                1830, 1830, 1830, 1830, 1830, 1830, 1830, 1830, 1830, 1830, 1830, 1830, 1830, 1830, 1830,
              ],
            ],
          },
        },
      ],
    },
  },
};

export const QUERY_DATA_ERROR_RESPONSE = {
  results: {
    A: {
      error: 'error querying the database: error executing query: ERROR: syntax error at or near "!"\n  Position: 1',
      status: 500,
      frames: [
        {
          schema: {
            name: 'A',
            refId: 'A',
            meta: {
              executedQueryString: '!SELECT eventname FROM event ORDER BY eventname ASC LIMIT 1',
            },
            fields: [],
          },
          data: {
            values: [],
          },
        },
      ],
    },
  },
};
