//var PHP_HOST = "https://astrelle.tk/elysiumlocations/";
//var PHP_HOST = "http://ast.sudooo.com/elysiumlocations/"
var PHP_HOST = "https://us-central1-npc-locator-backend.cloudfunctions.net/"
var GET_RECORD_URL = PHP_HOST + "getrecord";
var RECORD_URL = PHP_HOST + "record";
$.ajaxSetup({crossDomain: true});

var locPositions = [[149,960], [645,265], [496,870], [431,461], [124,589], [213,420], [548,375], [336,823], [370,762], [368,460], [580,758], [119,643], [209,319], [424,740], [635,479], [234,229], [290,817], [176,466], [111,310], [120,258], [493,276], [448,570], [421,647], [613,724], [154,892], [282,567], [773,961], [463,423], [370,347], [461,839], [226,554], [772,935], [673,612], [585,564], [149,813], [325,975], [655,208], [460,345], [255,815], [683,258], [638,834], [141,746], [668,175], [176,875], [249,972], [563,880], [236,778], [389,516], [669,674], [497,965], [648,566], [540,419], [439,483], [676,254], [767,890], [234,751], [155,234], [348,465], [126,368]];

var locNames = ["Desa Salju", "Desa Amethyst", "Desa Petualang", "Desa Pemanah", "Kota Matahari", "Desa Gunung Angsa", "Desa Khayalan", "Kemah Sumor", "Desa Angin", "Desa Peri Bulan", "Kuil Anggrek", "Kota Angkasa", "Benteng Bandit Selatan", "Kota Angin", "Desa Tersembunyi", "Kuil Leluhur", "Tembok Raksasa", "Desa Pasir", "Desa Bandit", "Kuil Abadi", "Makam Terlantar", "Kota Danau Langit", "Kota Sparrow", "Kemah Pasukan", "Kota Penjaga Utara", "Gunung Ekor Naga", "Reruntuhan Bleakhaven", "Istana 3 Raja", "Desa Bambu", "Rumah Pemburu", "Desa Mata Air", "Altar Mimpi", "Desa Pesisir", "Desa Anggrek", "Kota Penjaga Selatan", "Lembah Salju", "Desa Taring Naga", "Kota Taring", "Kemah Petualang", "Altar Api", "Desa Nelayan", "Desa Api", "Kemah Pemecah Ombak", "Kota Penjaga Timur", "Desa Beku", "Desa Benteng Kayu", "Desa Topeng", "Gerbang Kuno", "Pulau Tanpa Nama", "Dataran Penebangan", "Desa Bunga", "Desa Permata", "Lembah Shatran", "Pulau Mimpi", "Dawnglory", "Dataran Kelabu",  "Celah Keabadian", "Hutan Peri", "Gurun Pasir"]

var npcs = [["Kon Leron", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
["Shon Saiven", 23, 12, 9, 28, 11, 15, 29, 21, 10, 17, 25, 8, 30, 5, 0, 33, 43, 35, 6, 24, 4, 13, 36, 32, 20, 27, 16, 26, 22, 46, 44, 14, 34, 3, 2, 7, 18, 40, 1, 41, 47, 19, 50, 31, 42, 49, 38, 51, 39, 48, 37, 45],
["Tsen Wankay", 14, 38, 34, 33, 20, 13, 18, 35, 11, 2, 8, 4, 1, 21, 31, 5, 26, 9, 36, 41, 24, 7, 28, 0, 19, 10, 27, 25, 3, 6, 12, 43, 23, 15, 32, 17, 22, 50, 46, 48, 37, 39, 44, 16, 30, 51, 29, 40, 49, 45, 42, 47],
["Sonn Katson", 43, 29, 23, 5, 19, 7, 22, 9, 20, 32, 4, 24, 46, 35, 16, 21, 25, 34, 28, 48, 41, 17, 33, 31, 39, 11, 10, 8, 15, 36, 38, 26, 14, 13, 0, 2, 3, 44, 6, 45, 42, 49, 12, 27, 1, 40, 18, 50, 51, 47, 30, 37],
["Geon Nenya", 16, 6, 0, 13, 41, 35, 28, 2, 24, 23, 20, 19, 29, 17, 26, 7, 10, 32, 3, 49, 39, 9, 15, 43, 48, 4, 8, 11, 5, 22, 46, 27, 31, 21, 14, 34, 33, 30, 18, 51, 44, 45, 1, 25, 38, 37, 36, 42, 47, 40, 12, 50],
["Fox Child", 8, 3, 26, 9, 51, 32, 13, 14, 49, 16, 48, 45, 28, 23, 11, 34, 24, 43, 21, 37, 47, 0, 35, 10, 40, 39, 19, 41, 17, 5, 22, 4, 25, 2, 27, 31, 7, 29, 33, 42, 46, 50, 18, 20, 36, 12, 15, 38, 44, 30, 6, 1],
["Jade Feline", 31, 46, 32, 15, 24, 21, 36, 17, 4, 34, 11, 20, 38, 7, 43, 13, 27, 2, 22, 39, 19, 35, 3, 14, 41, 8, 25, 10, 33, 18, 1, 16, 0, 5, 23, 9, 28, 42, 29, 49, 50, 48, 30, 26, 12, 47, 6, 37, 45, 51, 44, 40],
["Yon Tonsyn", 25, 22, 43, 35, 49, 2, 15, 23, 39, 31, 41, 48, 36, 34, 10, 9, 4, 14, 5, 47, 45, 32, 21, 27, 51, 19, 20, 24, 7, 33, 18, 8, 26, 17, 16, 0, 13, 38, 28, 37, 1, 40, 29, 11, 6, 44, 3, 12, 50, 42, 46, 30],
["Leu Ninsi", 11, 33, 27, 2, 47, 23, 21, 31, 45, 26, 49, 51, 3, 0, 4, 32, 19, 16, 7, 50, 40, 14, 17, 8, 37, 48, 41, 39, 1, 13, 28, 20, 10, 34, 25, 43, 35, 6, 15, 44, 29, 42, 36, 24, 22, 9, 5, 46, 30, 12, 18, 38],
["Zuw Yonen", 4, 15, 25, 34, 40, 0, 7, 43, 51, 27, 45, 47, 33, 14, 20, 23, 41, 26, 35, 42, 37, 31, 9, 11, 50, 49, 39, 48, 2, 21, 3, 24, 8, 32, 10, 16, 17, 18, 5, 30, 6, 44, 22, 19, 28, 38, 13, 29, 12, 1, 36, 46],
["Vin Horlan", 27, 36, 31, 7, 48, 9, 33, 32, 41, 14, 19, 39, 18, 2, 25, 17, 11, 0, 15, 51, 49, 34, 13, 26, 45, 24, 4, 20, 21, 3, 6, 10, 16, 35, 43, 23, 5, 1, 22, 40, 12, 47, 46, 8, 29, 42, 28, 30, 37, 50, 38, 44],
["Wan Yirzin", 10, 28, 16, 17, 45, 34, 5, 0, 48, 43, 39, 49, 22, 32, 8, 2, 20, 31, 13, 40, 51, 23, 7, 25, 47, 41, 24, 19, 35, 15, 36, 11, 27, 9, 26, 14, 21, 46, 3, 50, 38, 37, 6, 4, 18, 30, 33, 1, 42, 44, 29, 12],
["Granny Sven", 26, 18, 14, 21, 39, 17, 3, 34, 19, 0, 24, 41, 6, 9, 27, 35, 8, 23, 33, 45, 48, 2, 5, 16, 49, 20, 11, 4, 13, 28, 29, 25, 43, 7, 31, 32, 15, 12, 36, 47, 30, 51, 38, 10, 46, 50, 22, 44, 40, 37, 1, 42]]
npcs.sort(function(a, b){ return a[0] > b[0]});

var otherNpcs = [["Dil Honse", 52, 45, 53],
["Jan Holfen", 54, 55, 56],
["Jee Enir", 45, 53, 57],
["Lee Sefan", 20, 28, 52],
["Loo Kohan", 56, 20, 28],
["Lor Wenil", 55, 56, 20],
["Ol Ninze", 57, 58, 54],
["Wan Lanch", 58, 54, 55],
["Wong Zehow", 53, 57, 58],
["Xi Chenko", 28, 52, 45]];


var walkingPaths = {454545: [130, 2573.5,
[[555.4, 895], [555.5, 895.2], [555.6, 895.3], [555.6, 895.4], [555.7, 895.6], [555.7, 895.8], [555.8, 896], [555.9, 896.2], [556, 896.4], [556, 896.5], [556.2, 896.6], [556.3, 896.7], [556.4, 896.9], [556.5, 896.9], [556.7, 897], [556.9, 897.1], [557.1, 897.2], [557.2, 897.2], [557.3, 897.3], [557.5, 897.4], [557.6, 897.5], [557.8, 897.6], [558, 897.7], [558.1, 897.8], [558.3, 897.8], [558.5, 897.8], [558.7, 897.8], [558.9, 897.8], [559, 897.9], [559.2, 897.9], [559.4, 898], [559.6, 898.1], [559.8, 898.2], [560, 898.2], [560.2, 898.2], [560.4, 898.2], [560.6, 898.2], [560.8, 898.2], [561, 898.2], [561.2, 898.2], [561.4, 898.2], [561.5, 898.2], [561.6, 898.2], [561.8, 898.1], [562, 898.1], [562.2, 898], [562.4, 897.9], [562.6, 897.9], [562.8, 897.9], [563, 897.9], [563.1, 897.9], [563.3, 897.8], [563.5, 897.8], [563.7, 897.7], [563.9, 897.6], [564.1, 897.5], [564.3, 897.4], [564.5, 897.4], [564.6, 897.3], [564.8, 897.2], [565, 897.2], [565, 897.2], [565.2, 897.1], [565.3, 897], [565.5, 896.8], [565.6, 896.7], [565.7, 896.7], [565.9, 896.6], [566.1, 896.5], [566.3, 896.4], [566.4, 896.3], [566.6, 896.2], [566.7, 896.1], [566.9, 896], [567.1, 895.9], [567.2, 895.9], [567.4, 895.7], [567.5, 895.6], [567.7, 895.5], [567.9, 895.4], [567.9, 895.4], [568.1, 895.2], [568.2, 895.1], [568.4, 894.9], [568.5, 894.9], [568.6, 894.8], [568.8, 894.7], [569, 894.7], [569.2, 894.6], [569.4, 894.5], [569.6, 894.4], [569.7, 894.3], [569.9, 894.3], [570, 894.2], [570.2, 894.1], [570.4, 894], [570.5, 893.9], [570.7, 893.9], [570.9, 893.8], [571.1, 893.8], [571.3, 893.8], [571.5, 893.8], [571.7, 893.7], [571.9, 893.7], [572.1, 893.7], [572.2, 893.6], [572.4, 893.7], [572.6, 893.7], [572.8, 893.7], [573, 893.8], [573.2, 893.8], [573.4, 893.8], [573.6, 893.8], [573.8, 893.9], [574, 894], [574.1, 894], [574.3, 894.1], [574.5, 894], [574.7, 894], [574.9, 894], [575.1, 894], [575.3, 894.1], [575.5, 894.1], [575.7, 894.2], [575.8, 894.4], [576, 894.5], [576.1, 894.6], [576.3, 894.6], [576.5, 894.5], [576.5, 894.5], [576.7, 894.5], [576.9, 894.5], [577.2, 894.5], [577.3, 894.5], [577.5, 894.5], [577.7, 894.5], [577.9, 894.5], [578, 894.5], [578.2, 894.4], [578.4, 894.3], [578.5, 894.2], [578.7, 894.1], [578.8, 894], [578.9, 893.9], [579.1, 893.8], [579.3, 893.7], [579.4, 893.6], [579.6, 893.5], [579.7, 893.3], [579.9, 893.2], [580, 893], [580.1, 892.9], [580.2, 892.8], [580.3, 892.6], [580.4, 892.4], [580.5, 892.3], [580.5, 892.2], [580.6, 892], [580.6, 891.8], [580.6, 891.6], [580.6, 891.5], [580.6, 891.5], [580.7, 891.3], [580.7, 891.1], [580.7, 890.9], [580.8, 890.7], [580.8, 890.5], [580.8, 890.3], [580.9, 890.1], [580.9, 889.9], [581, 889.7], [581, 889.5], [581.1, 889.3], [581.2, 889.1], [581.2, 889], [581.3, 888.8], [581.4, 888.6], [581.5, 888.4], [581.5, 888.2], [581.6, 888.1], [581.7, 888], [581.8, 887.8], [581.9, 887.6], [582, 887.5], [582.1, 887.3], [582.2, 887.2], [582.2, 887.1], [582.3, 886.9], [582.4, 886.7], [582.4, 886.5], [582.5, 886.3], [582.6, 886.2], [582.7, 886], [582.8, 885.9], [582.9, 885.8], [583.1, 885.6], [583.2, 885.5], [583.3, 885.3], [583.4, 885.2], [583.5, 885], [583.6, 884.8], [583.7, 884.7], [583.8, 884.5], [584, 884.4], [584.1, 884.2], [584.2, 884.2], [584.3, 884], [584.5, 883.9], [584.6, 883.7], [584.7, 883.6], [584.9, 883.5], [585, 883.3], [585.2, 883.2], [585.3, 883.1], [585.4, 882.9], [585.5, 882.8], [585.6, 882.6], [585.7, 882.4], [585.8, 882.2], [585.9, 882.1], [586.1, 881.9], [586.2, 881.8], [586.3, 881.6], [586.4, 881.5], [586.6, 881.4], [586.7, 881.2], [586.8, 881.1], [586.9, 880.9], [587, 880.7], [587.1, 880.5], [587.1, 880.3], [587.2, 880.3], [587.3, 880.1], [587.4, 880], [587.5, 879.8], [587.7, 879.7], [587.8, 879.5], [587.9, 879.4], [588, 879.2], [588.1, 879], [588.2, 878.9], [588.3, 878.8], [588.4, 878.6], [588.5, 878.4], [588.6, 878.2], [588.7, 878.1], [588.7, 877.9], [588.8, 877.7], [588.9, 877.5], [588.9, 877.3], [589, 877.2], [589, 877], [589.1, 876.8], [589.2, 876.6], [589.3, 876.4], [589.3, 876.3], [589.4, 876.2], [589.4, 876], [589.5, 875.8], [589.6, 875.6], [589.6, 875.4], [589.7, 875.2], [589.8, 875.1], [589.9, 874.9], [590, 874.7], [590.2, 874.6], [590.3, 874.4], [590.4, 874.2], [590.5, 874.1], [590.7, 873.9], [590.8, 873.8], [591, 873.6], [591.1, 873.5], [591.3, 873.4], [591.4, 873.2], [591.6, 873.1], [591.7, 873], [591.9, 872.9], [592, 872.8], [592.2, 872.6], [592.2, 872.6], [592.3, 872.5], [592.5, 872.3], [592.6, 872.2], [592.7, 872], [592.9, 871.9], [593, 871.7], [593.2, 871.6], [593.3, 871.4], [593.4, 871.2], [593.5, 871.1], [593.7, 871], [593.9, 870.9], [594.1, 870.8], [594.3, 870.7], [594.4, 870.6], [594.5, 870.5], [594.6, 870.3], [594.7, 870.1], [594.8, 870], [595, 869.9], [595.1, 869.7], [595.2, 869.6], [595.3, 869.5], [595.5, 869.4], [595.7, 869.3], [595.8, 869.2], [595.9, 869], [596, 868.9], [596.1, 868.7], [596.1, 868.6], [596.2, 868.4], [596.3, 868.2], [596.3, 868.1], [596.3, 867.9], [596.2, 867.7], [596.2, 867.5], [596.2, 867.3], [596.2, 867.1], [596.2, 866.9], [596.2, 866.7], [596.2, 866.6], [596.2, 866.4], [596.2, 866.2], [596.2, 866], [596.1, 865.9], [596.1, 865.7], [596.2, 865.5], [596.2, 865.3], [596.2, 865.1], [596.3, 864.9], [596.3, 864.7], [596.3, 864.5], [596.3, 864.3], [596.3, 864.1], [596.3, 863.9], [596.3, 863.7], [596.4, 863.5], [596.4, 863.3], [596.5, 863.1], [596.5, 863], [596.5, 862.8], [596.6, 862.6], [596.6, 862.4], [596.6, 862.2], [596.6, 862], [596.6, 861.9], [596.6, 861.7], [596.7, 861.5], [596.7, 861.3], [596.7, 861.1], [596.7, 860.9], [596.8, 860.8], [596.9, 860.6], [596.9, 860.4], [597, 860.2], [597, 860], [597, 859.8], [597, 859.6], [597, 859.5], [597.1, 859.4], [597.1, 859.2], [597.1, 859.2], [597.2, 859.1], [597.2, 858.9], [597.3, 858.7], [597.4, 858.5], [597.4, 858.4], [597.5, 858.2], [597.5, 858], [597.5, 857.8], [597.6, 857.6], [597.6, 857.5], [597.6, 857.4], [597.7, 857.2], [597.8, 857.1], [597.9, 856.9], [598, 856.7], [598.1, 856.5], [598.1, 856.3], [598.2, 856.2], [598.2, 856], [598.3, 855.8], [598.3, 855.6], [598.4, 855.4], [598.5, 855.3], [598.6, 855.1], [598.7, 855], [598.9, 854.9], [599.1, 854.8], [599.1, 854.6], [599.2, 854.4], [599.2, 854.3], [599.3, 854.1], [599.3, 853.9], [599.3, 853.7], [599.3, 853.5], [599.3, 853.4], [599.3, 853.2], [599.3, 853.2], [599.3, 853.1], [599.2, 852.8], [599.2, 852.6], [599.2, 852.4], [599.2, 852.2], [599.1, 852], [599, 851.9], [598.9, 851.7], [598.9, 851.5], [598.8, 851.3], [598.8, 851.1], [598.7, 850.9], [598.7, 850.8], [598.6, 850.6], [598.6, 850.4], [598.6, 850.2], [598.5, 850], [598.5, 849.8], [598.5, 849.6], [598.5, 849.4], [598.5, 849.2], [598.5, 849.1], [598.4, 848.9], [598.4, 848.7], [598.3, 848.5], [598.2, 848.3], [598.2, 848.2], [598.1, 848], [598.1, 847.8], [598.1, 847.6], [598, 847.4], [598, 847.2], [597.9, 847], [597.8, 846.9], [597.7, 846.7], [597.6, 846.5], [597.5, 846.3], [597.5, 846.1], [597.4, 845.9], [597.3, 845.7], [597.2, 845.6], [597.1, 845.4], [597, 845.3], [596.9, 845.1], [596.9, 844.9], [596.8, 844.7], [596.7, 844.5], [596.6, 844.4], [596.5, 844.2], [596.4, 844], [596.3, 843.9], [596.2, 843.7], [596.1, 843.5], [596, 843.4], [595.9, 843.3], [595.9, 843.2], [595.7, 843], [595.6, 842.8], [595.5, 842.7], [595.4, 842.6], [595.3, 842.4], [595.1, 842.3], [595, 842.1], [594.9, 842], [594.7, 841.8], [594.6, 841.7], [594.5, 841.5], [594.5, 841.4], [594.3, 841.2], [594.1, 841], [594, 840.9], [593.8, 840.8], [593.7, 840.6], [593.7, 840.4], [593.6, 840.2], [593.5, 840], [593.5, 839.9], [593.4, 839.8], [593.3, 839.7], [593.1, 839.5], [592.9, 839.3], [592.8, 839.2], [592.8, 839.1], [592.7, 838.9], [592.6, 838.7], [592.6, 838.5], [592.5, 838.3], [592.4, 838.1], [592.3, 837.9], [592.3, 837.8], [592.3, 837.5], [592.2, 837.4], [592.2, 837.2], [592.2, 837], [592.3, 836.8], [592.3, 836.6], [592.4, 836.4], [592.4, 836.2], [592.5, 836.1], [592.5, 835.9], [592.6, 835.7], [592.7, 835.5], [592.7, 835.4], [592.8, 835.2], [592.9, 835], [592.9, 834.9], [593, 834.7], [593.1, 834.5], [593.2, 834.3], [593.3, 834.2], [593.4, 834], [593.5, 833.9], [593.6, 833.7], [593.7, 833.5], [593.8, 833.3], [593.9, 833.2], [594, 833], [594, 832.9], [594, 832.8], [594.1, 832.6], [594.1, 832.4], [594.1, 832.3], [594.2, 832.2], [594.4, 832.1], [594.4, 832], [594.5, 831.8], [594.4, 831.7], [594.4, 831.6], [594.3, 831.6], [594.3, 831.6], [594.3, 831.6], [594.3, 831.6], [594.3, 831.6], [594.1, 831.7], [594.1, 831.8], [593.9, 832], [593.8, 832.1], [593.8, 832.3], [593.6, 832.5], [593.5, 832.5], [593.3, 832.5], [593.1, 832.5], [593.1, 832.3], [593, 832.1], [593.1, 831.9], [593.2, 831.8], [593.3, 831.6], [593.5, 831.4], [593.5, 831.3], [593.5, 831.2], [593.5, 831.1], [593.3, 831.1], [593.2, 831.1], [593.1, 831], [592.9, 830.9], [592.7, 830.9], [592.5, 830.8], [592.5, 830.8], [592.3, 830.7], [592.1, 830.6], [591.9, 830.5], [591.8, 830.5], [591.6, 830.4], [591.4, 830.4], [591.2, 830.4], [591, 830.3], [591, 830.3], [590.8, 830.2], [590.6, 830.1], [590.4, 830], [590.2, 830], [590.2, 830], [590, 829.9], [589.8, 829.9], [589.6, 829.8], [589.4, 829.8], [589.2, 829.7], [589, 829.7], [588.8, 829.6], [588.6, 829.6], [588.5, 829.5], [588.3, 829.5], [588.1, 829.4], [587.9, 829.3], [587.7, 829.3], [587.5, 829.2], [587.3, 829.2], [587.1, 829.1], [586.9, 829], [586.7, 829], [586.5, 828.9], [586.4, 828.9], [586.3, 828.9], [586.1, 828.8], [585.9, 828.8], [585.7, 828.7], [585.5, 828.7], [585.3, 828.7], [585.2, 828.6], [585, 828.5], [584.8, 828.5], [584.6, 828.4], [584.4, 828.3], [584.3, 828.3], [584.1, 828.3], [583.9, 828.2], [583.7, 828.2], [583.5, 828.1], [583.3, 828.1], [583.2, 828.1], [583, 828], [582.8, 828], [582.6, 827.9], [582.4, 827.9], [582.2, 827.9], [582.1, 827.8], [581.9, 827.8], [581.7, 827.7], [581.5, 827.7], [581.3, 827.6], [581.1, 827.6], [581, 827.6], [580.8, 827.5], [580.6, 827.5], [580.4, 827.4], [580.2, 827.4], [580, 827.3], [579.9, 827.3], [579.7, 827.3], [579.5, 827.3], [579.3, 827.2], [579.1, 827.2], [578.9, 827.2], [578.8, 827.2], [578.6, 827.1], [578.4, 827.1], [578.2, 827], [578, 827], [577.9, 827], [577.8, 826.9], [577.6, 826.9], [577.4, 826.8], [577.2, 826.8], [577, 826.7], [576.9, 826.7], [576.8, 826.7], [576.6, 826.7], [576.5, 826.6], [576.3, 826.6], [576.2, 826.6], [576, 826.6], [575.7, 826.6], [575.5, 826.6], [575.3, 826.6], [575.1, 826.5], [575, 826.5], [574.9, 826.5], [574.7, 826.4], [574.5, 826.4], [574.3, 826.3], [574.2, 826.3], [574.1, 826.3], [573.9, 826.3], [573.7, 826.3], [573.5, 826.3], [573.3, 826.2], [573.1, 826.2], [572.9, 826.2], [572.8, 826.2], [572.6, 826.2], [572.4, 826.2], [572.2, 826.2], [572, 826.2], [571.8, 826.2], [571.7, 826.2], [571.5, 826.2], [571.3, 826.2], [571.2, 826.3], [571, 826.3], [570.9, 826.4], [570.7, 826.5], [570.6, 826.6], [570.4, 826.8], [570.3, 826.8], [570.2, 827], [570.1, 827.1], [569.9, 827.3], [569.8, 827.4], [569.7, 827.6], [569.6, 827.7], [569.5, 827.8], [569.4, 828], [569.2, 828.1], [569.1, 828.3], [569, 828.4], [568.9, 828.6], [568.8, 828.8], [568.7, 828.9], [568.6, 829.1], [568.6, 829.1], [568.4, 829.3], [568.3, 829.5], [568.2, 829.7], [568.1, 829.8], [568.1, 829.9], [568, 830.1], [567.8, 830.2], [567.7, 830.4], [567.7, 830.5], [567.6, 830.7], [567.5, 830.9], [567.4, 831.1], [567.3, 831.2], [567.2, 831.4], [567.2, 831.6], [567.1, 831.8], [567, 831.9], [566.9, 832.1], [566.8, 832.3], [566.7, 832.5], [566.7, 832.7], [566.6, 832.8], [566.5, 833], [566.5, 833.2], [566.4, 833.4], [566.3, 833.6], [566.2, 833.8], [566.1, 834], [566.1, 834.2], [566, 834.4], [566, 834.6], [565.9, 834.8], [565.9, 834.9], [565.8, 835.1], [565.7, 835.3], [565.7, 835.3], [565.6, 835.5], [565.5, 835.6], [565.3, 835.8], [565.3, 835.9], [565.2, 836.1], [565.1, 836.3], [565.1, 836.5], [565, 836.6], [564.9, 836.7], [564.8, 836.9], [564.7, 837], [564.5, 837.2], [564.4, 837.3], [564.3, 837.5], [564.2, 837.6], [564.1, 837.8], [563.9, 837.9], [563.8, 838.1], [563.7, 838.2], [563.6, 838.4], [563.4, 838.6], [563.3, 838.7], [563.2, 838.9], [563, 839], [562.9, 839.1], [562.7, 839.2], [562.5, 839.4], [562.5, 839.4], [562.3, 839.5], [562.1, 839.6], [562.1, 839.6], [561.9, 839.7], [561.7, 839.7], [561.6, 839.8], [561.4, 839.9], [561.2, 839.9], [561, 839.9], [560.8, 839.9], [560.6, 839.9], [560.5, 839.9], [560.3, 839.9], [560.1, 839.9], [559.9, 839.9], [559.7, 839.9], [559.6, 839.9], [559.4, 839.8], [559.2, 839.8], [559, 839.8], [558.8, 839.7], [558.6, 839.7], [558.5, 839.6], [558.3, 839.6], [558, 839.5], [557.8, 839.4], [557.7, 839.4], [557.4, 839.3], [557.3, 839.2], [557.1, 839.2], [556.9, 839.1], [556.7, 839], [556.5, 839], [556.3, 838.9], [556.1, 838.9], [555.9, 838.8], [555.7, 838.8], [555.5, 838.7], [555.3, 838.7], [555.1, 838.6], [554.9, 838.6], [554.7, 838.6], [554.5, 838.6], [554.3, 838.6], [554.2, 838.5], [554, 838.5], [553.8, 838.4], [553.6, 838.3], [553.5, 838.3], [553.3, 838.2], [553.1, 838.1], [553, 838], [552.8, 837.9], [552.7, 837.9], [552.6, 837.8], [552.4, 837.7], [552.2, 837.6], [552, 837.5], [551.9, 837.4], [551.7, 837.3], [551.5, 837.2], [551.3, 837.1], [551.1, 837.1], [551, 837], [550.8, 837], [550.6, 837], [550.4, 836.9], [550.2, 836.9], [550.1, 836.9], [549.9, 836.8], [549.8, 836.7], [549.6, 836.6], [549.4, 836.5], [549.3, 836.5], [549.1, 836.5], [548.9, 836.4], [548.7, 836.4], [548.5, 836.3], [548.4, 836.3], [548.2, 836.1], [548.1, 836], [547.9, 835.9], [547.7, 835.8], [547.6, 835.7], [547.4, 835.7], [547.2, 835.6], [547, 835.6], [546.8, 835.5], [546.6, 835.4], [546.4, 835.4], [546.2, 835.3], [546, 835.3], [545.8, 835.3], [545.6, 835.3], [545.4, 835.3], [545.2, 835.3], [545, 835.3], [544.8, 835.3], [544.7, 835.2], [544.5, 835.2], [544.3, 835.1], [544.1, 835], [543.9, 835], [543.8, 835], [543.6, 835], [543.4, 835.1], [543.3, 835.1], [543.1, 835.2], [542.9, 835.2], [542.7, 835.3], [542.6, 835.3], [542.4, 835.3], [542.2, 835.4], [542, 835.5], [541.8, 835.5], [541.6, 835.6], [541.4, 835.6], [541.3, 835.6], [541.1, 835.7], [541, 835.8], [540.9, 835.8], [540.7, 835.9], [540.6, 836], [540.4, 836.1], [540.2, 836.2], [540.1, 836.3], [540, 836.4], [539.8, 836.5], [539.6, 836.6], [539.5, 836.7], [539.3, 836.8], [539.2, 836.9], [539, 837.1], [538.9, 837.2], [538.8, 837.3], [538.7, 837.4], [538.5, 837.6], [538.4, 837.7], [538.2, 837.8], [538, 838], [537.9, 838.1], [537.7, 838.2], [537.7, 838.4], [537.6, 838.6], [537.5, 838.7], [537.4, 838.9], [537.2, 839], [537.1, 839.2], [537, 839.3], [536.9, 839.5], [536.8, 839.6], [536.6, 839.8], [536.5, 840], [536.5, 840], [536.4, 840.2], [536.3, 840.4], [536.1, 840.5], [536, 840.7], [536, 840.9], [535.9, 841.1], [535.8, 841.3], [535.7, 841.4], [535.6, 841.6], [535.5, 841.8], [535.4, 842], [535.3, 842.1], [535.3, 842.2], [535.2, 842.4], [535.2, 842.6], [535.1, 842.8], [535.1, 842.9], [535, 843], [534.9, 843.2], [534.9, 843.4], [534.8, 843.6], [534.7, 843.7], [534.7, 843.8], [534.6, 844], [534.5, 844.2], [534.5, 844.4], [534.4, 844.6], [534.3, 844.8], [534.3, 845], [534.2, 845.2], [534.2, 845.3], [534.1, 845.5], [534, 845.7], [533.9, 845.9], [533.8, 846.1], [533.7, 846.2], [533.7, 846.3], [533.6, 846.5], [533.6, 846.7], [533.5, 846.8], [533.5, 847], [533.4, 847.2], [533.3, 847.4], [533.3, 847.6], [533.2, 847.8], [533.1, 848], [533.1, 848], [533.1, 848.2], [533.1, 848.4], [533.1, 848.6], [533.1, 848.7], [533, 848.9], [532.9, 849.1], [532.8, 849.3], [532.8, 849.4], [532.8, 849.6], [532.8, 849.8], [532.8, 849.9], [532.8, 850.1], [532.8, 850.3], [532.7, 850.5], [532.7, 850.7], [532.7, 850.8], [532.7, 851], [532.8, 851.2], [532.7, 851.4], [532.7, 851.5], [532.6, 851.6], [532.6, 851.8], [532.6, 852], [532.6, 852.2], [532.6, 852.3], [532.6, 852.5], [532.7, 852.7], [532.7, 852.9], [532.7, 853.1], [532.7, 853.3], [532.6, 853.5], [532.6, 853.7], [532.6, 853.8], [532.6, 854], [532.6, 854.2], [532.6, 854.2], [532.7, 854.4], [532.7, 854.6], [532.7, 854.8], [532.7, 855.1], [532.7, 855.3], [532.7, 855.5], [532.7, 855.5], [532.8, 855.7], [532.8, 855.9], [532.9, 856.2], [532.9, 856.3], [532.9, 856.5], [532.9, 856.7], [533, 856.9], [533, 857.1], [533, 857.2], [533, 857.3], [533, 857.6], [533, 857.8], [533.1, 858], [533.1, 858.2], [533.2, 858.4], [533.2, 858.6], [533.3, 858.8], [533.3, 858.9], [533.2, 859.1], [533.2, 859.3], [533.2, 859.5], [533.2, 859.7], [533.2, 859.9], [533.2, 860.1], [533.3, 860.3], [533.4, 860.5], [533.4, 860.6], [533.5, 860.8], [533.5, 861], [533.5, 861.2], [533.6, 861.4], [533.6, 861.5], [533.6, 861.7], [533.7, 861.9], [533.7, 862.1], [533.7, 862.4], [533.7, 862.4], [533.8, 862.6], [533.8, 862.8], [533.9, 863], [533.9, 863.2], [533.9, 863.3], [534, 863.5], [534, 863.7], [534.1, 863.9], [534.1, 864.1], [534.1, 864.2], [534.2, 864.4], [534.2, 864.6], [534.3, 864.8], [534.3, 865], [534.3, 865.1], [534.4, 865.3], [534.4, 865.5], [534.5, 865.7], [534.5, 865.8], [534.6, 865.9], [534.6, 866.1], [534.7, 866.3], [534.8, 866.5], [534.8, 866.7], [534.9, 866.9], [534.9, 867.1], [534.9, 867.3], [534.9, 867.5], [535, 867.7], [535, 867.9], [535, 868.1], [535, 868.3], [535.1, 868.5], [535.1, 868.7], [535.2, 868.9], [535.3, 869.1], [535.3, 869.2], [535.4, 869.4], [535.5, 869.6], [535.5, 869.7], [535.6, 869.8], [535.7, 870], [535.8, 870.2], [535.8, 870.4], [535.9, 870.5], [536, 870.7], [536, 870.9], [536.1, 871.1], [536.2, 871.2], [536.2, 871.3], [536.3, 871.5], [536.4, 871.7], [536.5, 871.8], [536.6, 871.9], [536.7, 872.1], [536.8, 872.2], [537, 872.4], [537.1, 872.5], [537.2, 872.6], [537.2, 872.7], [537.4, 872.9], [537.5, 873], [537.6, 873.1], [537.7, 873.3], [537.9, 873.4], [538, 873.6], [538.1, 873.7], [538.2, 873.9], [538.3, 874.1], [538.4, 874.3], [538.4, 874.4], [538.5, 874.5], [538.5, 874.6], [538.6, 874.7], [538.7, 874.9], [538.8, 875], [538.8, 875.2], [538.9, 875.4], [538.9, 875.5], [539, 875.7], [539.2, 875.8], [539.3, 876], [539.4, 876.1], [539.5, 876.3], [539.6, 876.5], [539.7, 876.7], [539.7, 876.8], [539.8, 876.9], [539.9, 877.1], [540, 877.3], [540.1, 877.5], [540.2, 877.6], [540.3, 877.8], [540.4, 877.9], [540.5, 878.1], [540.6, 878.2], [540.7, 878.4], [540.7, 878.6], [540.8, 878.7], [540.9, 878.9], [541, 879.1], [541.1, 879.2], [541.2, 879.4], [541.3, 879.6], [541.4, 879.8], [541.5, 880], [541.6, 880.1], [541.8, 880.3], [541.9, 880.5], [542, 880.6], [542.1, 880.8], [542.2, 881], [542.3, 881.1], [542.4, 881.3], [542.5, 881.5], [542.6, 881.7], [542.7, 881.8], [542.7, 881.9], [542.8, 882.1], [542.9, 882.3], [543, 882.5], [543.1, 882.7], [543.2, 882.8], [543.4, 883], [543.5, 883.1], [543.6, 883.3], [543.7, 883.5], [543.8, 883.6], [543.9, 883.8], [544, 884], [544.1, 884.1], [544.3, 884.2], [544.4, 884.4], [544.4, 884.5], [544.6, 884.7], [544.8, 884.8], [544.9, 884.9], [545.1, 885], [545.2, 885], [545.3, 885.1], [545.5, 885.3], [545.6, 885.4], [545.8, 885.5], [545.9, 885.6], [546, 885.7], [546.2, 885.8], [546.4, 885.9], [546.5, 886], [546.6, 886.1], [546.8, 886.3], [546.9, 886.4], [547.1, 886.6], [547.2, 886.7], [547.3, 886.8], [547.4, 887], [547.5, 887.2], [547.6, 887.3], [547.7, 887.5], [547.8, 887.7], [547.9, 887.8], [548, 888], [548.2, 888.2], [548.3, 888.3], [548.5, 888.4], [548.7, 888.5], [548.9, 888.6], [549, 888.6], [549.1, 888.8], [549.2, 888.9], [549.3, 889.1], [549.4, 889.3], [549.4, 889.4], [549.6, 889.6], [549.7, 889.7], [549.8, 889.9], [549.9, 890.1], [550.1, 890.2], [550.2, 890.3], [550.4, 890.4], [550.6, 890.5], [550.6, 890.6], [550.8, 890.8], [550.9, 890.9], [551, 891.1], [551.1, 891.2], [551.2, 891.4], [551.3, 891.6], [551.4, 891.8], [551.5, 891.9], [551.7, 892], [551.8, 892.1], [551.9, 892.1], [552, 892.3], [552.1, 892.4], [552.3, 892.6], [552.4, 892.7], [552.6, 892.9], [552.7, 893], [552.9, 893.1], [553.1, 893.2], [553.2, 893.2], [553.3, 893.3], [553.4, 893.5], [553.5, 893.6], [553.7, 893.7], [553.8, 893.9], [554, 894], [554.1, 894.1], [554.3, 894.2], [554.5, 894.3], [554.7, 894.3], [554.8, 894.4]]]};





var token = '';

var sortSelect = function(sel) {
	var opts_list = sel.find('option');
	opts_list.sort(function(a, b) { return $(a).text() > $(b).text() ? 1 : -1; });
	sel.empty().append(opts_list);
};

var makeMap = function(i, side) {
	var label = $("<div class='label'>"+locNames[i]+"</div>");
	var map = $("<div class='map'></div>");
	
	if (side == "walking" && i in walkingPaths) {
		for (var p in walkingPaths[i][2]) {
			var x = Math.round(-15+0.42*walkingPaths[i][2][p][0]);
			var y = Math.round(434- .42*walkingPaths[i][2][p][1]);
			map.append($("<div class='markerpath' style ='top: "+y+"px; left: "+x+"px'></div>"));
		}
		map.append($("<div class='walkingNpc' data-id='"+i+"'></div>"));
	} else {
	
	//for (var i in locPositions) {
		var pos = locPositions[i];
		var x = Math.round(-15+0.42*pos[0]);
		var y = Math.round(434- .42*pos[1]);
		map.append($("<div class='marker' style ='top: "+y+"px; left: "+x+"px'></div>"));
	//}
	}
	//return map;
	return label.append(map);
};

var updateWalkerPos = function() {
	var server = localStorage.getItem('server');
	if (!server) return;
	var locations = {
		"etherblade":	"US/Pacific",
		"twilight":	"US/Pacific",
		"tideswell":	"US/Eastern",
		"dawnglory": "Europe/Paris",
		"sun":	"Asia/Manila",
		"newmoon": "Asia/Manila"
	};

	var location = locations[server];
	var daystart = moment.utc().tz(location).startOf('day');
	var currentTimeOffset = moment.utc().diff(daystart);


	$('.walkingNpc').each(function() {
		var loc = $(this).attr('data-id');
		var offset = (currentTimeOffset - walkingPaths[loc][0])/1000;
		var period = walkingPaths[loc][1];
		var path = walkingPaths[loc][2];
		var cycle = offset/period;
		var curSpot = cycle - Math.floor(cycle);
		curSpot = curSpot < 0.5 ? curSpot * 2 : 2 - 2*curSpot;
		var index = curSpot * path.length;
		var iLow = Math.max(0, Math.floor(index));
		var iHigh = Math.min(path.length-1, Math.ceil(index));
		var ratio = index - Math.floor(index);
		var x = (1-ratio) * path[iLow][0] + ratio* path[iHigh][0];
		var y = (1-ratio) * path[iLow][1] + ratio* path[iHigh][1];
		
		var x = Math.round(-15+0.42*x);
		var y = Math.round(434- .42*y);
		$(this).css({'top': y+"px", 'left': x+'px'});
	});
	setTimeout(updateWalkerPos, 1000);
};

var init = function(side, npclist) {
	var npcSelect = $("#"+side+" .npcName");
	var locationSelect = $("#"+side+" .location");
	var result = $("#"+side+" .result");
	for (var i = 0; i < npclist.length; i++)
		npcSelect.append($("<option value=\""+(i)+"\">"+npclist[i][0]+"</option>"));
	sortSelect(npcSelect);
	npcSelect.prepend('<option value="-1" selected>Pilih NPC</option>');
	npcSelect.change(function(){
		var val = $(this).val();
		if (val < 0 || val >= npclist.length) return;
		$("option[value=-1]", $(this)).remove();
		locationSelect.empty()
		for(var i = 1; i < npclist[val].length; i++) 
			locationSelect.append($("<option value=\""+(i)+"\">"+locNames[npclist[val][i]]+"</option>"));
		sortSelect(locationSelect);
		locationSelect.prepend('<option value="-1" selected>Pilih Lokasi</option>');
	});
	locationSelect.change(function(){
		var val = $(this).val();
		if (val == -1) return;
		$("option[value=-1]", $(this)).remove();
		result.empty();
		for(var i = 0; i < npclist.length; i++) {
			result.append($("<div class='namelabel'>"+npclist[i][0]+"</div><span> di </span>")).append(makeMap(npclist[i][val], side)).append($("<br>"));
		}
		var button = $(".submit", $(this).closest(".container"));
		button.show();
		if ($(".message", $(this).closest(".container")).text() == "")
			button.prop('disabled', false);
	});
}; 

var makeSightingWidget = function(record) {
	var npclist = [npcs, otherNpcs][record.type];
	if (record.npc < 0 || record.npc >= npclist.length || record.loc < 1 || record.loc >= npclist[0].length) 
		return;
	var date = new Date(record.time*1000);
	var identicon = '<div style="display: inline-block; width:20px; height:20px; background-image: url(\'https://vanillicon.com/'+record.id+'_50.png\'); background-size: cover"></div> mengetahui ';
	var typeName = record.type ? " <span style='color: #BFB'>berjalan</span> di " : " <span style='color: #FBB'>diam</span> in ";
	var sighting = $("<div class='sighting'><span class='time'>"+date.toLocaleString()+"</span>: </div>").append(identicon);
	var link = $("<span class='link'>"+npclist[record.npc][0]+typeName+locNames[npclist[record.npc][record.loc]]+" (#"+record.loc+")</span>");
	link.click(function(){
		var type = record.type == "1" ? "#walking" : "#normal";
		$(".npcName", type).val(record.npc).change();
		$(".location", type).val(record.loc).change();
		$(".submit", type).prop('disabled', true);
	});
	sighting.append(link);
	return sighting;
};

var autoPickSighting = function(records) {
	var server = localStorage.getItem('server');
	if (!server) return;
	var counts = [{}, {}]
	for (var i = 0; i < records.length; i++) {
		if (isCurrentDay(records[i].time, server)) {
			counts[records[i].type][records[i].loc] = (counts[records[i].type][records[i].loc] || 0) + 1;
		}
	}
	var keys = [Object.keys(counts[0]), Object.keys(counts[1])];
	for (var i = 0; i < keys.length; i++) {
		var maxValue = 0;
		var maxLoc = 0;
		for (var j = 0; j < keys[i].length; j++) {
			if (counts[i][keys[i][j]] > maxValue) {
				maxValue = counts[i][keys[i][j]];
				maxLoc = keys[i][j];
			}
		}
		if (maxLoc > 0 && maxValue >= 1) {
			var type = ["#normal", "#walking"][i];
			$(".npcName", type).val(0).change();
			$(".location", type).val(maxLoc).change();
			$(".submit", type).prop('disabled', true);
		}
	}
};

var setSightings = function(data) {
	console.log(data);
	$(".sightings .result").empty();
	for (var i = 0; i < data.records.length; i++) {
		$(".sightings .result").prepend(makeSightingWidget(data.records[i]));
	}
	autoPickSighting(data.records);
};

var isCurrentDay = function(utc, server) {
	var locations = {
		"etherblade":	"US/Pacific",
		"twilight":	"US/Pacific",
		"tideswell":	"US/Eastern",
		"dawnglory": "Europe/Paris",
		"sun":	"Asia/Manila",
		"newmoon": "Asia/Manila"	
	};

	var location = locations[server];
	var daystart = moment.utc().tz(location).startOf('day');
	return daystart.diff(moment.utc(utc*1000)) < 0;
};

var initSightings = function() {
	$(".sightings .server").change(function(){
		var server = $(this).val();
		if (server == "-1") return;
		$(".sightings .server option[value=-1]").remove();
		localStorage.setItem('server', server);
		$.ajax({url: GET_RECORD_URL+"?q="+server, dataType: "json"}).done(setSightings);
	});
	
	$(".submit").click(function(){
		var message = $('.message', $(this).closest('.container'));
		var server = $(".server").val();
		var type = $(this).closest("#walking").length;
		var button = $(this);
		
		var captchaSuccess = function(response){
			token = response;
			button.click();
		};
		
		if (token == ''){
			if ($("#captcha"+type).length == 0) {
				var capctchaDiv = $("<div id='captcha"+type+"' class='recaptcha'></div>")
				$(this).closest('.container').append(capctchaDiv);
				grecaptcha.render(capctchaDiv[0], {
					'sitekey' : '6LftfNsZAAAAADzZs_1wNaI2SUe2nyp1mH6b_pY0',
					'callback' : captchaSuccess,
					'theme' : 'dark'
				});
			}
			return;
		}

		// if (grecaptcha.getResponse('captcha'+type) == '')
		// 	return;
		// token = grecaptcha.getResponse('captcha'+type);

		var npc = $(".npcName", $(this).closest(".container")).val();
		var loc = $(".location", $(this).closest(".container")).val();
		if (server == -1 || npc == -1 || loc == -1) {
			return;
		}
		$(this).prop('disabled', true);

		$.post(RECORD_URL, {
			q: server,
			type: type,
			name: npc,
			loc: loc,
			token: token
		}).done(function(result){
			message.text("Thanks!").toggle;
			$(".sightings .server").change();
			token = '';
			$(".recaptcha").remove();
		});
	}).hide();
};

function load() {
	var server = localStorage.getItem('server');
	if (server) {
		$(".sightings .server").val(server).change();
	}
};

var onloadCallback = function() {};

  
$(document).ready(function(){
	init('normal', npcs);
	init('walking', otherNpcs);
	initSightings();
	load();
	updateWalkerPos()
});