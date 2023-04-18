//Define all staticNodes for colors with help form site https://css-tricks.com/snippets/css/named-colors-and-hex-equivalents/ used script:
/**
 * (c) MAKOUS 
 *      values = {}
for(const t of document.querySelectorAll('table:not(.bc-table)')){
for(const r of t.querySelectorAll('tbody tr')){
 if(r.querySelector('td')){
 let all = r.querySelectorAll('td');
                 let name = all[1].textContent.substring(1).toLowerCase()
                 values[all[0].textContent.toLowerCase()] = {
                          type: 'Constant',       
                          dataType: '<color>',    
                          value: {
                            hex: `${name}`,
                   					baseHex: `${name}`,
                  					alphaHex: `${name}ff`,
                   					red: parseInt(name.substring(0,2), 16),
                   					green: parseInt(name.substring(2,4), 16),
                   					blue: parseInt(name.substring(4,6), 16)
                          }
                 
           				}
           }
       }
       }
       console.log(JSON.stringify(values))
 * 
 * 
 */
let lib = {
    context:{
        staticNodes: {
            aliceblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "f0f8ff",
                baseHex: "f0f8ff",
                alphaHex: "f0f8ffff",
                red: 240,
                green: 248,
                blue: 255
              }
            },
            antiquewhite : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "faebd7",
                baseHex: "faebd7",
                alphaHex: "faebd7ff",
                red: 250,
                green: 235,
                blue: 215
              }
            },
            aqua : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "00ffff",
                baseHex: "00ffff",
                alphaHex: "00ffffff",
                red: 0,
                green: 255,
                blue: 255
              }
            },
            aquamarine : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "7fffd4",
                baseHex: "7fffd4",
                alphaHex: "7fffd4ff",
                red: 127,
                green: 255,
                blue: 212
              }
            },
            azure : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "f0ffff",
                baseHex: "f0ffff",
                alphaHex: "f0ffffff",
                red: 240,
                green: 255,
                blue: 255
              }
            },
            beige : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "f5f5dc",
                baseHex: "f5f5dc",
                alphaHex: "f5f5dcff",
                red: 245,
                green: 245,
                blue: 220
              }
            },
            bisque : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffe4c4",
                baseHex: "ffe4c4",
                alphaHex: "ffe4c4ff",
                red: 255,
                green: 228,
                blue: 196
              }
            },
            black : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "000000",
                baseHex: "000000",
                alphaHex: "000000ff",
                red: 0,
                green: 0,
                blue: 0
              }
            },
            blanchedalmond : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffebcd",
                baseHex: "ffebcd",
                alphaHex: "ffebcdff",
                red: 255,
                green: 235,
                blue: 205
              }
            },
            blue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "0000ff",
                baseHex: "0000ff",
                alphaHex: "0000ffff",
                red: 0,
                green: 0,
                blue: 255
              }
            },
            blueviolet : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "8a2be2",
                baseHex: "8a2be2",
                alphaHex: "8a2be2ff",
                red: 138,
                green: 43,
                blue: 226
              }
            },
            brown : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "a52a2a",
                baseHex: "a52a2a",
                alphaHex: "a52a2aff",
                red: 165,
                green: 42,
                blue: 42
              }
            },
            burlywood : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "deb887",
                baseHex: "deb887",
                alphaHex: "deb887ff",
                red: 222,
                green: 184,
                blue: 135
              }
            },
            cadetblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "5f9ea0",
                baseHex: "5f9ea0",
                alphaHex: "5f9ea0ff",
                red: 95,
                green: 158,
                blue: 160
              }
            },
            chartreuse : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "7fff00",
                baseHex: "7fff00",
                alphaHex: "7fff00ff",
                red: 127,
                green: 255,
                blue: 0
              }
            },
            chocolate : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "d2691e",
                baseHex: "d2691e",
                alphaHex: "d2691eff",
                red: 210,
                green: 105,
                blue: 30
              }
            },
            coral : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ff7f50",
                baseHex: "ff7f50",
                alphaHex: "ff7f50ff",
                red: 255,
                green: 127,
                blue: 80
              }
            },
            cornflowerblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "6495ed",
                baseHex: "6495ed",
                alphaHex: "6495edff",
                red: 100,
                green: 149,
                blue: 237
              }
            },
            cornsilk : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "fff8dc",
                baseHex: "fff8dc",
                alphaHex: "fff8dcff",
                red: 255,
                green: 248,
                blue: 220
              }
            },
            crimson : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "dc143c",
                baseHex: "dc143c",
                alphaHex: "dc143cff",
                red: 220,
                green: 20,
                blue: 60
              }
            },
            cyan : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "00ffff",
                baseHex: "00ffff",
                alphaHex: "00ffffff",
                red: 0,
                green: 255,
                blue: 255
              }
            },
            darkblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "00008b",
                baseHex: "00008b",
                alphaHex: "00008bff",
                red: 0,
                green: 0,
                blue: 139
              }
            },
            darkcyan : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "008b8b",
                baseHex: "008b8b",
                alphaHex: "008b8bff",
                red: 0,
                green: 139,
                blue: 139
              }
            },
            darkgoldenrod : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "b8860b",
                baseHex: "b8860b",
                alphaHex: "b8860bff",
                red: 184,
                green: 134,
                blue: 11
              }
            },
            darkgray : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "a9a9a9",
                baseHex: "a9a9a9",
                alphaHex: "a9a9a9ff",
                red: 169,
                green: 169,
                blue: 169
              }
            },
            darkgrey : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "a9a9a9",
                baseHex: "a9a9a9",
                alphaHex: "a9a9a9ff",
                red: 169,
                green: 169,
                blue: 169
              }
            },
            darkgreen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "006400",
                baseHex: "006400",
                alphaHex: "006400ff",
                red: 0,
                green: 100,
                blue: 0
              }
            },
            darkkhaki : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "bdb76b",
                baseHex: "bdb76b",
                alphaHex: "bdb76bff",
                red: 189,
                green: 183,
                blue: 107
              }
            },
            darkmagenta : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "8b008b",
                baseHex: "8b008b",
                alphaHex: "8b008bff",
                red: 139,
                green: 0,
                blue: 139
              }
            },
            darkolivegreen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "556b2f",
                baseHex: "556b2f",
                alphaHex: "556b2fff",
                red: 85,
                green: 107,
                blue: 47
              }
            },
            darkorange : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ff8c00",
                baseHex: "ff8c00",
                alphaHex: "ff8c00ff",
                red: 255,
                green: 140,
                blue: 0
              }
            },
            darkorchid : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "9932cc",
                baseHex: "9932cc",
                alphaHex: "9932ccff",
                red: 153,
                green: 50,
                blue: 204
              }
            },
            darkred : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "8b0000",
                baseHex: "8b0000",
                alphaHex: "8b0000ff",
                red: 139,
                green: 0,
                blue: 0
              }
            },
            darksalmon : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "e9967a",
                baseHex: "e9967a",
                alphaHex: "e9967aff",
                red: 233,
                green: 150,
                blue: 122
              }
            },
            darkseagreen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "8fbc8f",
                baseHex: "8fbc8f",
                alphaHex: "8fbc8fff",
                red: 143,
                green: 188,
                blue: 143
              }
            },
            darkslateblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "483d8b",
                baseHex: "483d8b",
                alphaHex: "483d8bff",
                red: 72,
                green: 61,
                blue: 139
              }
            },
            darkslategray : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "2f4f4f",
                baseHex: "2f4f4f",
                alphaHex: "2f4f4fff",
                red: 47,
                green: 79,
                blue: 79
              }
            },
            darkslategrey : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "2f4f4f",
                baseHex: "2f4f4f",
                alphaHex: "2f4f4fff",
                red: 47,
                green: 79,
                blue: 79
              }
            },
            darkturquoise : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "00ced1",
                baseHex: "00ced1",
                alphaHex: "00ced1ff",
                red: 0,
                green: 206,
                blue: 209
              }
            },
            darkviolet : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "9400d3",
                baseHex: "9400d3",
                alphaHex: "9400d3ff",
                red: 148,
                green: 0,
                blue: 211
              }
            },
            deeppink : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ff1493",
                baseHex: "ff1493",
                alphaHex: "ff1493ff",
                red: 255,
                green: 20,
                blue: 147
              }
            },
            deepskyblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "00bfff",
                baseHex: "00bfff",
                alphaHex: "00bfffff",
                red: 0,
                green: 191,
                blue: 255
              }
            },
            dimgray : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "696969",
                baseHex: "696969",
                alphaHex: "696969ff",
                red: 105,
                green: 105,
                blue: 105
              }
            },
            dimgrey : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "696969",
                baseHex: "696969",
                alphaHex: "696969ff",
                red: 105,
                green: 105,
                blue: 105
              }
            },
            dodgerblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "1e90ff",
                baseHex: "1e90ff",
                alphaHex: "1e90ffff",
                red: 30,
                green: 144,
                blue: 255
              }
            },
            firebrick : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "b22222",
                baseHex: "b22222",
                alphaHex: "b22222ff",
                red: 178,
                green: 34,
                blue: 34
              }
            },
            floralwhite : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "fffaf0",
                baseHex: "fffaf0",
                alphaHex: "fffaf0ff",
                red: 255,
                green: 250,
                blue: 240
              }
            },
            forestgreen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "228b22",
                baseHex: "228b22",
                alphaHex: "228b22ff",
                red: 34,
                green: 139,
                blue: 34
              }
            },
            fuchsia : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ff00ff",
                baseHex: "ff00ff",
                alphaHex: "ff00ffff",
                red: 255,
                green: 0,
                blue: 255
              }
            },
            gainsboro : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "dcdcdc",
                baseHex: "dcdcdc",
                alphaHex: "dcdcdcff",
                red: 220,
                green: 220,
                blue: 220
              }
            },
            ghostwhite : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "f8f8ff",
                baseHex: "f8f8ff",
                alphaHex: "f8f8ffff",
                red: 248,
                green: 248,
                blue: 255
              }
            },
            gold : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffd700",
                baseHex: "ffd700",
                alphaHex: "ffd700ff",
                red: 255,
                green: 215,
                blue: 0
              }
            },
            goldenrod : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "daa520",
                baseHex: "daa520",
                alphaHex: "daa520ff",
                red: 218,
                green: 165,
                blue: 32
              }
            },
            gray : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "808080",
                baseHex: "808080",
                alphaHex: "808080ff",
                red: 128,
                green: 128,
                blue: 128
              }
            },
            grey : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "808080",
                baseHex: "808080",
                alphaHex: "808080ff",
                red: 128,
                green: 128,
                blue: 128
              }
            },
            green : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "008000",
                baseHex: "008000",
                alphaHex: "008000ff",
                red: 0,
                green: 128,
                blue: 0
              }
            },
            greenyellow : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "adff2f",
                baseHex: "adff2f",
                alphaHex: "adff2fff",
                red: 173,
                green: 255,
                blue: 47
              }
            },
            honeydew : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "f0fff0",
                baseHex: "f0fff0",
                alphaHex: "f0fff0ff",
                red: 240,
                green: 255,
                blue: 240
              }
            },
            hotpink : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ff69b4",
                baseHex: "ff69b4",
                alphaHex: "ff69b4ff",
                red: 255,
                green: 105,
                blue: 180
              }
            },
            indianred  : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "cd5c5c",
                baseHex: "cd5c5c",
                alphaHex: "cd5c5cff",
                red: 205,
                green: 92,
                blue: 92
              }
            },
            indigo   : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "4b0082",
                baseHex: "4b0082",
                alphaHex: "4b0082ff",
                red: 75,
                green: 0,
                blue: 130
              }
            },
            ivory : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "fffff0",
                baseHex: "fffff0",
                alphaHex: "fffff0ff",
                red: 255,
                green: 255,
                blue: 240
              }
            },
            khaki : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "f0e68c",
                baseHex: "f0e68c",
                alphaHex: "f0e68cff",
                red: 240,
                green: 230,
                blue: 140
              }
            },
            lavender : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "e6e6fa",
                baseHex: "e6e6fa",
                alphaHex: "e6e6faff",
                red: 230,
                green: 230,
                blue: 250
              }
            },
            lavenderblush : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "fff0f5",
                baseHex: "fff0f5",
                alphaHex: "fff0f5ff",
                red: 255,
                green: 240,
                blue: 245
              }
            },
            lawngreen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "7cfc00",
                baseHex: "7cfc00",
                alphaHex: "7cfc00ff",
                red: 124,
                green: 252,
                blue: 0
              }
            },
            lemonchiffon : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "fffacd",
                baseHex: "fffacd",
                alphaHex: "fffacdff",
                red: 255,
                green: 250,
                blue: 205
              }
            },
            lightblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "add8e6",
                baseHex: "add8e6",
                alphaHex: "add8e6ff",
                red: 173,
                green: 216,
                blue: 230
              }
            },
            lightcoral : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "f08080",
                baseHex: "f08080",
                alphaHex: "f08080ff",
                red: 240,
                green: 128,
                blue: 128
              }
            },
            lightcyan : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "e0ffff",
                baseHex: "e0ffff",
                alphaHex: "e0ffffff",
                red: 224,
                green: 255,
                blue: 255
              }
            },
            lightgoldenrodyellow : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "fafad2",
                baseHex: "fafad2",
                alphaHex: "fafad2ff",
                red: 250,
                green: 250,
                blue: 210
              }
            },
            lightgray : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "d3d3d3",
                baseHex: "d3d3d3",
                alphaHex: "d3d3d3ff",
                red: 211,
                green: 211,
                blue: 211
              }
            },
            lightgrey : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "d3d3d3",
                baseHex: "d3d3d3",
                alphaHex: "d3d3d3ff",
                red: 211,
                green: 211,
                blue: 211
              }
            },
            lightgreen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "90ee90",
                baseHex: "90ee90",
                alphaHex: "90ee90ff",
                red: 144,
                green: 238,
                blue: 144
              }
            },
            lightpink : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffb6c1",
                baseHex: "ffb6c1",
                alphaHex: "ffb6c1ff",
                red: 255,
                green: 182,
                blue: 193
              }
            },
            lightsalmon : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffa07a",
                baseHex: "ffa07a",
                alphaHex: "ffa07aff",
                red: 255,
                green: 160,
                blue: 122
              }
            },
            lightseagreen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "20b2aa",
                baseHex: "20b2aa",
                alphaHex: "20b2aaff",
                red: 32,
                green: 178,
                blue: 170
              }
            },
            lightskyblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "87cefa",
                baseHex: "87cefa",
                alphaHex: "87cefaff",
                red: 135,
                green: 206,
                blue: 250
              }
            },
            lightslategray : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "778899",
                baseHex: "778899",
                alphaHex: "778899ff",
                red: 119,
                green: 136,
                blue: 153
              }
            },
            lightslategrey : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "778899",
                baseHex: "778899",
                alphaHex: "778899ff",
                red: 119,
                green: 136,
                blue: 153
              }
            },
            lightsteelblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "b0c4de",
                baseHex: "b0c4de",
                alphaHex: "b0c4deff",
                red: 176,
                green: 196,
                blue: 222
              }
            },
            lightyellow : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffffe0",
                baseHex: "ffffe0",
                alphaHex: "ffffe0ff",
                red: 255,
                green: 255,
                blue: 224
              }
            },
            lime : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "00ff00",
                baseHex: "00ff00",
                alphaHex: "00ff00ff",
                red: 0,
                green: 255,
                blue: 0
              }
            },
            limegreen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "32cd32",
                baseHex: "32cd32",
                alphaHex: "32cd32ff",
                red: 50,
                green: 205,
                blue: 50
              }
            },
            linen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "faf0e6",
                baseHex: "faf0e6",
                alphaHex: "faf0e6ff",
                red: 250,
                green: 240,
                blue: 230
              }
            },
            magenta : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ff00ff",
                baseHex: "ff00ff",
                alphaHex: "ff00ffff",
                red: 255,
                green: 0,
                blue: 255
              }
            },
            maroon : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "800000",
                baseHex: "800000",
                alphaHex: "800000ff",
                red: 128,
                green: 0,
                blue: 0
              }
            },
            mediumaquamarine : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "66cdaa",
                baseHex: "66cdaa",
                alphaHex: "66cdaaff",
                red: 102,
                green: 205,
                blue: 170
              }
            },
            mediumblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "0000cd",
                baseHex: "0000cd",
                alphaHex: "0000cdff",
                red: 0,
                green: 0,
                blue: 205
              }
            },
            mediumorchid : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ba55d3",
                baseHex: "ba55d3",
                alphaHex: "ba55d3ff",
                red: 186,
                green: 85,
                blue: 211
              }
            },
            mediumpurple : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "9370d8",
                baseHex: "9370d8",
                alphaHex: "9370d8ff",
                red: 147,
                green: 112,
                blue: 216
              }
            },
            mediumseagreen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "3cb371",
                baseHex: "3cb371",
                alphaHex: "3cb371ff",
                red: 60,
                green: 179,
                blue: 113
              }
            },
            mediumslateblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "7b68ee",
                baseHex: "7b68ee",
                alphaHex: "7b68eeff",
                red: 123,
                green: 104,
                blue: 238
              }
            },
            mediumspringgreen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "00fa9a",
                baseHex: "00fa9a",
                alphaHex: "00fa9aff",
                red: 0,
                green: 250,
                blue: 154
              }
            },
            mediumturquoise : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "48d1cc",
                baseHex: "48d1cc",
                alphaHex: "48d1ccff",
                red: 72,
                green: 209,
                blue: 204
              }
            },
            mediumvioletred : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "c71585",
                baseHex: "c71585",
                alphaHex: "c71585ff",
                red: 199,
                green: 21,
                blue: 133
              }
            },
            midnightblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "191970",
                baseHex: "191970",
                alphaHex: "191970ff",
                red: 25,
                green: 25,
                blue: 112
              }
            },
            mintcream : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "f5fffa",
                baseHex: "f5fffa",
                alphaHex: "f5fffaff",
                red: 245,
                green: 255,
                blue: 250
              }
            },
            mistyrose : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffe4e1",
                baseHex: "ffe4e1",
                alphaHex: "ffe4e1ff",
                red: 255,
                green: 228,
                blue: 225
              }
            },
            moccasin : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffe4b5",
                baseHex: "ffe4b5",
                alphaHex: "ffe4b5ff",
                red: 255,
                green: 228,
                blue: 181
              }
            },
            navajowhite : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffdead",
                baseHex: "ffdead",
                alphaHex: "ffdeadff",
                red: 255,
                green: 222,
                blue: 173
              }
            },
            navy : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "000080",
                baseHex: "000080",
                alphaHex: "000080ff",
                red: 0,
                green: 0,
                blue: 128
              }
            },
            oldlace : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "fdf5e6",
                baseHex: "fdf5e6",
                alphaHex: "fdf5e6ff",
                red: 253,
                green: 245,
                blue: 230
              }
            },
            olive : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "808000",
                baseHex: "808000",
                alphaHex: "808000ff",
                red: 128,
                green: 128,
                blue: 0
              }
            },
            olivedrab : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "6b8e23",
                baseHex: "6b8e23",
                alphaHex: "6b8e23ff",
                red: 107,
                green: 142,
                blue: 35
              }
            },
            orange : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffa500",
                baseHex: "ffa500",
                alphaHex: "ffa500ff",
                red: 255,
                green: 165,
                blue: 0
              }
            },
            orangered : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ff4500",
                baseHex: "ff4500",
                alphaHex: "ff4500ff",
                red: 255,
                green: 69,
                blue: 0
              }
            },
            orchid : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "da70d6",
                baseHex: "da70d6",
                alphaHex: "da70d6ff",
                red: 218,
                green: 112,
                blue: 214
              }
            },
            palegoldenrod : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "eee8aa",
                baseHex: "eee8aa",
                alphaHex: "eee8aaff",
                red: 238,
                green: 232,
                blue: 170
              }
            },
            palegreen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "98fb98",
                baseHex: "98fb98",
                alphaHex: "98fb98ff",
                red: 152,
                green: 251,
                blue: 152
              }
            },
            paleturquoise : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "afeeee",
                baseHex: "afeeee",
                alphaHex: "afeeeeff",
                red: 175,
                green: 238,
                blue: 238
              }
            },
            palevioletred : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "d87093",
                baseHex: "d87093",
                alphaHex: "d87093ff",
                red: 216,
                green: 112,
                blue: 147
              }
            },
            papayawhip : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffefd5",
                baseHex: "ffefd5",
                alphaHex: "ffefd5ff",
                red: 255,
                green: 239,
                blue: 213
              }
            },
            peachpuff : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffdab9",
                baseHex: "ffdab9",
                alphaHex: "ffdab9ff",
                red: 255,
                green: 218,
                blue: 185
              }
            },
            peru : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "cd853f",
                baseHex: "cd853f",
                alphaHex: "cd853fff",
                red: 205,
                green: 133,
                blue: 63
              }
            },
            pink : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffc0cb",
                baseHex: "ffc0cb",
                alphaHex: "ffc0cbff",
                red: 255,
                green: 192,
                blue: 203
              }
            },
            plum : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "dda0dd",
                baseHex: "dda0dd",
                alphaHex: "dda0ddff",
                red: 221,
                green: 160,
                blue: 221
              }
            },
            powderblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "b0e0e6",
                baseHex: "b0e0e6",
                alphaHex: "b0e0e6ff",
                red: 176,
                green: 224,
                blue: 230
              }
            },
            purple : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "800080",
                baseHex: "800080",
                alphaHex: "800080ff",
                red: 128,
                green: 0,
                blue: 128
              }
            },
            red : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ff0000",
                baseHex: "ff0000",
                alphaHex: "ff0000ff",
                red: 255,
                green: 0,
                blue: 0
              }
            },
            rosybrown : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "bc8f8f",
                baseHex: "bc8f8f",
                alphaHex: "bc8f8fff",
                red: 188,
                green: 143,
                blue: 143
              }
            },
            royalblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "4169e1",
                baseHex: "4169e1",
                alphaHex: "4169e1ff",
                red: 65,
                green: 105,
                blue: 225
              }
            },
            saddlebrown : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "8b4513",
                baseHex: "8b4513",
                alphaHex: "8b4513ff",
                red: 139,
                green: 69,
                blue: 19
              }
            },
            salmon : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "fa8072",
                baseHex: "fa8072",
                alphaHex: "fa8072ff",
                red: 250,
                green: 128,
                blue: 114
              }
            },
            sandybrown : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "f4a460",
                baseHex: "f4a460",
                alphaHex: "f4a460ff",
                red: 244,
                green: 164,
                blue: 96
              }
            },
            seagreen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "2e8b57",
                baseHex: "2e8b57",
                alphaHex: "2e8b57ff",
                red: 46,
                green: 139,
                blue: 87
              }
            },
            seashell : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "fff5ee",
                baseHex: "fff5ee",
                alphaHex: "fff5eeff",
                red: 255,
                green: 245,
                blue: 238
              }
            },
            sienna : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "a0522d",
                baseHex: "a0522d",
                alphaHex: "a0522dff",
                red: 160,
                green: 82,
                blue: 45
              }
            },
            silver : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "c0c0c0",
                baseHex: "c0c0c0",
                alphaHex: "c0c0c0ff",
                red: 192,
                green: 192,
                blue: 192
              }
            },
            skyblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "87ceeb",
                baseHex: "87ceeb",
                alphaHex: "87ceebff",
                red: 135,
                green: 206,
                blue: 235
              }
            },
            slateblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "6a5acd",
                baseHex: "6a5acd",
                alphaHex: "6a5acdff",
                red: 106,
                green: 90,
                blue: 205
              }
            },
            slategray : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "708090",
                baseHex: "708090",
                alphaHex: "708090ff",
                red: 112,
                green: 128,
                blue: 144
              }
            },
            slategrey : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "708090",
                baseHex: "708090",
                alphaHex: "708090ff",
                red: 112,
                green: 128,
                blue: 144
              }
            },
            snow : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "fffafa",
                baseHex: "fffafa",
                alphaHex: "fffafaff",
                red: 255,
                green: 250,
                blue: 250
              }
            },
            springgreen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "00ff7f",
                baseHex: "00ff7f",
                alphaHex: "00ff7fff",
                red: 0,
                green: 255,
                blue: 127
              }
            },
            steelblue : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "4682b4",
                baseHex: "4682b4",
                alphaHex: "4682b4ff",
                red: 70,
                green: 130,
                blue: 180
              }
            },
            tan : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "d2b48c",
                baseHex: "d2b48c",
                alphaHex: "d2b48cff",
                red: 210,
                green: 180,
                blue: 140
              }
            },
            teal : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "008080",
                baseHex: "008080",
                alphaHex: "008080ff",
                red: 0,
                green: 128,
                blue: 128
              }
            },
            thistle : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "d8bfd8",
                baseHex: "d8bfd8",
                alphaHex: "d8bfd8ff",
                red: 216,
                green: 191,
                blue: 216
              }
            },
            tomato : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ff6347",
                baseHex: "ff6347",
                alphaHex: "ff6347ff",
                red: 255,
                green: 99,
                blue: 71
              }
            },
            turquoise : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "40e0d0",
                baseHex: "40e0d0",
                alphaHex: "40e0d0ff",
                red: 64,
                green: 224,
                blue: 208
              }
            },
            violet : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ee82ee",
                baseHex: "ee82ee",
                alphaHex: "ee82eeff",
                red: 238,
                green: 130,
                blue: 238
              }
            },
            wheat : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "f5deb3",
                baseHex: "f5deb3",
                alphaHex: "f5deb3ff",
                red: 245,
                green: 222,
                blue: 179
              }
            },
            white : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffffff",
                baseHex: "ffffff",
                alphaHex: "ffffffff",
                red: 255,
                green: 255,
                blue: 255
              }
            },
            whitesmoke : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "f5f5f5",
                baseHex: "f5f5f5",
                alphaHex: "f5f5f5ff",
                red: 245,
                green: 245,
                blue: 245
              }
            },
            yellow : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "ffff00",
                baseHex: "ffff00",
                alphaHex: "ffff00ff",
                red: 255,
                green: 255,
                blue: 0
              }
            },
            yellowgreen : {
              type: "Constant",
              dataType: "<color>",
              value: {
                hex: "9acd32",
                baseHex: "9acd32",
                alphaHex: "9acd32ff",
                red: 154,
                green: 205,
                blue: 50
              }
            }
          }
    }
}
module.exports = lib;