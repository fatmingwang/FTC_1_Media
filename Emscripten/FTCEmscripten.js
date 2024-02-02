var Module = typeof Module != "undefined" ? Module : {};

if (!Module.expectedDataFileDownloads) {
 Module.expectedDataFileDownloads = 0;
}

Module.expectedDataFileDownloads++;

(function() {
 if (Module["ENVIRONMENT_IS_PTHREAD"] || Module["$ww"]) return;
 var loadPackage = function(metadata) {
  var PACKAGE_PATH = "";
  if (typeof window === "object") {
   PACKAGE_PATH = window["encodeURIComponent"](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/");
  } else if (typeof process === "undefined" && typeof location !== "undefined") {
   PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/");
  }
  var PACKAGE_NAME = "D:/Work/FTC/FTC_1_Src/Src/FTC/FTC/Emscripten/Release_NO_PTHREAD_WITH_BULLET/FTCEmscripten.data";
  var REMOTE_PACKAGE_BASE = "FTCEmscripten.data";
  if (typeof Module["locateFilePackage"] === "function" && !Module["locateFile"]) {
   Module["locateFile"] = Module["locateFilePackage"];
   err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)");
  }
  var REMOTE_PACKAGE_NAME = Module["locateFile"] ? Module["locateFile"](REMOTE_PACKAGE_BASE, "") : REMOTE_PACKAGE_BASE;
  var REMOTE_PACKAGE_SIZE = metadata["remote_package_size"];
  function fetchRemotePackage(packageName, packageSize, callback, errback) {
   if (typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string") {
    require("fs").readFile(packageName, function(err, contents) {
     if (err) {
      errback(err);
     } else {
      callback(contents.buffer);
     }
    });
    return;
   }
   var xhr = new XMLHttpRequest();
   xhr.open("GET", packageName, true);
   xhr.responseType = "arraybuffer";
   xhr.onprogress = function(event) {
    var url = packageName;
    var size = packageSize;
    if (event.total) size = event.total;
    if (event.loaded) {
     if (!xhr.addedTotal) {
      xhr.addedTotal = true;
      if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
      Module.dataFileDownloads[url] = {
       loaded: event.loaded,
       total: size
      };
     } else {
      Module.dataFileDownloads[url].loaded = event.loaded;
     }
     var total = 0;
     var loaded = 0;
     var num = 0;
     for (var download in Module.dataFileDownloads) {
      var data = Module.dataFileDownloads[download];
      total += data.total;
      loaded += data.loaded;
      num++;
     }
     total = Math.ceil(total * Module.expectedDataFileDownloads / num);
     if (Module["setStatus"]) Module["setStatus"](`Downloading data... (${loaded}/${total})`);
    } else if (!Module.dataFileDownloads) {
     if (Module["setStatus"]) Module["setStatus"]("Downloading data...");
    }
   };
   xhr.onerror = function(event) {
    throw new Error("NetworkError for: " + packageName);
   };
   xhr.onload = function(event) {
    if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || xhr.status == 0 && xhr.response) {
     var packageData = xhr.response;
     callback(packageData);
    } else {
     throw new Error(xhr.statusText + " : " + xhr.responseURL);
    }
   };
   xhr.send(null);
  }
  function handleError(error) {
   console.error("package error:", error);
  }
  var fetchedCallback = null;
  var fetched = Module["getPreloadedPackage"] ? Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;
  if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
   if (fetchedCallback) {
    fetchedCallback(data);
    fetchedCallback = null;
   } else {
    fetched = data;
   }
  }, handleError);
  function runWithFS() {
   function assert(check, msg) {
    if (!check) throw msg + new Error().stack;
   }
   Module["FS_createPath"]("/", "assets", true, true);
   Module["FS_createPath"]("/assets", "Fish", true, true);
   Module["FS_createPath"]("/assets/Fish", "Bullet", true, true);
   Module["FS_createPath"]("/assets/Fish", "Image", true, true);
   Module["FS_createPath"]("/assets/Fish/Image", "BG", true, true);
   Module["FS_createPath"]("/assets/Fish/Image", "Bullet", true, true);
   Module["FS_createPath"]("/assets/Fish/Image", "Fish", true, true);
   Module["FS_createPath"]("/assets/Fish/Image/Fish", "AnglerFish", true, true);
   Module["FS_createPath"]("/assets/Fish/Image/Fish", "ClownFish", true, true);
   Module["FS_createPath"]("/assets/Fish/Image/Fish", "FlounderFish", true, true);
   Module["FS_createPath"]("/assets/Fish/Image/Fish", "JellyFish", true, true);
   Module["FS_createPath"]("/assets/Fish/Image/Fish", "KnifeFish", true, true);
   Module["FS_createPath"]("/assets/Fish/Image/Fish", "PufferFish", true, true);
   Module["FS_createPath"]("/assets/Fish/Image/Fish", "SquidFish", true, true);
   Module["FS_createPath"]("/assets/Fish/Image/Fish", "StingrayFish", true, true);
   Module["FS_createPath"]("/assets/Fish/Image/Fish", "ThreeFish", true, true);
   Module["FS_createPath"]("/assets/Fish/Image/Fish", "TurtleFish", true, true);
   Module["FS_createPath"]("/assets/Fish/Image", "PlayerUI", true, true);
   Module["FS_createPath"]("/assets/Fish", "MiniGame", true, true);
   Module["FS_createPath"]("/assets/Fish", "MonsterData", true, true);
   Module["FS_createPath"]("/assets/Fish/MonsterData", "AI", true, true);
   Module["FS_createPath"]("/assets/Fish/MonsterData", "Boss", true, true);
   Module["FS_createPath"]("/assets/Fish/MonsterData", "Group", true, true);
   Module["FS_createPath"]("/assets/Fish/MonsterData", "Path", true, true);
   Module["FS_createPath"]("/assets/Fish", "Particle", true, true);
   Module["FS_createPath"]("/assets/Fish", "Player", true, true);
   Module["FS_createPath"]("/assets/Fish", "Probability", true, true);
   function DataRequest(start, end, audio) {
    this.start = start;
    this.end = end;
    this.audio = audio;
   }
   DataRequest.prototype = {
    requests: {},
    open: function(mode, name) {
     this.name = name;
     this.requests[name] = this;
     Module["addRunDependency"](`fp ${this.name}`);
    },
    send: function() {},
    onload: function() {
     var byteArray = this.byteArray.subarray(this.start, this.end);
     this.finish(byteArray);
    },
    finish: function(byteArray) {
     var that = this;
     Module["FS_createDataFile"](this.name, null, byteArray, true, true, true);
     Module["removeRunDependency"](`fp ${that.name}`);
     this.requests[this.name] = null;
    }
   };
   var files = metadata["files"];
   for (var i = 0; i < files.length; ++i) {
    new DataRequest(files[i]["start"], files[i]["end"], files[i]["audio"] || 0).open("GET", files[i]["filename"]);
   }
   function processPackageData(arrayBuffer) {
    assert(arrayBuffer, "Loading data file failed.");
    assert(arrayBuffer.constructor.name === ArrayBuffer.name, "bad input to processPackageData");
    var byteArray = new Uint8Array(arrayBuffer);
    DataRequest.prototype.byteArray = byteArray;
    var files = metadata["files"];
    for (var i = 0; i < files.length; ++i) {
     DataRequest.prototype.requests[files[i].filename].onload();
    }
    Module["removeRunDependency"]("datafile_D:/Work/FTC/FTC_1_Src/Src/FTC/FTC/Emscripten/Release_NO_PTHREAD_WITH_BULLET/FTCEmscripten.data");
   }
   Module["addRunDependency"]("datafile_D:/Work/FTC/FTC_1_Src/Src/FTC/FTC/Emscripten/Release_NO_PTHREAD_WITH_BULLET/FTCEmscripten.data");
   if (!Module.preloadResults) Module.preloadResults = {};
   Module.preloadResults[PACKAGE_NAME] = {
    fromCache: false
   };
   if (fetched) {
    processPackageData(fetched);
    fetched = null;
   } else {
    fetchedCallback = processPackageData;
   }
  }
  if (Module["calledRun"]) {
   runWithFS();
  } else {
   if (!Module["preRun"]) Module["preRun"] = [];
   Module["preRun"].push(runWithFS);
  }
 };
 loadPackage({
  "files": [ {
   "filename": "/assets/Fish/Bullet/Bullet.xml",
   "start": 0,
   "end": 6939
  }, {
   "filename": "/assets/Fish/Image/BG/BG3.jpg",
   "start": 6939,
   "end": 477532
  }, {
   "filename": "/assets/Fish/Image/BG/BG4.jpg",
   "start": 477532,
   "end": 923255
  }, {
   "filename": "/assets/Fish/Image/BG/BGSetup.xml",
   "start": 923255,
   "end": 923453
  }, {
   "filename": "/assets/Fish/Image/Bullet/Attack.collision",
   "start": 923453,
   "end": 927608
  }, {
   "filename": "/assets/Fish/Image/Bullet/Attack.pi",
   "start": 927608,
   "end": 933187
  }, {
   "filename": "/assets/Fish/Image/Bullet/Attack.png",
   "start": 933187,
   "end": 981647
  }, {
   "filename": "/assets/Fish/Image/Bullet/Attack1.png",
   "start": 981647,
   "end": 1028629
  }, {
   "filename": "/assets/Fish/Image/Bullet/Bullet_0001.mpdi",
   "start": 1028629,
   "end": 1300842
  }, {
   "filename": "/assets/Fish/Image/Bullet/Bullet_0001.pi",
   "start": 1300842,
   "end": 1302805
  }, {
   "filename": "/assets/Fish/Image/Bullet/Bullet_0001.png",
   "start": 1302805,
   "end": 1317411
  }, {
   "filename": "/assets/Fish/Image/Bullet/FishingNet_0001.mpdi",
   "start": 1317411,
   "end": 1908748
  }, {
   "filename": "/assets/Fish/Image/Bullet/FishingNet_0001.pi",
   "start": 1908748,
   "end": 1911079
  }, {
   "filename": "/assets/Fish/Image/Bullet/FishingNet_0001.png",
   "start": 1911079,
   "end": 2071432
  }, {
   "filename": "/assets/Fish/Image/Fish/AnglerFish/AnglerFish.collision",
   "start": 2071432,
   "end": 2075168
  }, {
   "filename": "/assets/Fish/Image/Fish/AnglerFish/AnglerFish.mpdi",
   "start": 2075168,
   "end": 2093249
  }, {
   "filename": "/assets/Fish/Image/Fish/AnglerFish/AnglerFish.pi",
   "start": 2093249,
   "end": 2098040
  }, {
   "filename": "/assets/Fish/Image/Fish/AnglerFish/AnglerFish.png",
   "start": 2098040,
   "end": 2192820
  }, {
   "filename": "/assets/Fish/Image/Fish/AnglerFish/Thumbs.db",
   "start": 2192820,
   "end": 2240948
  }, {
   "filename": "/assets/Fish/Image/Fish/ClownFish/79979.mpdi",
   "start": 2240948,
   "end": 2245806
  }, {
   "filename": "/assets/Fish/Image/Fish/ClownFish/ClownFish.collision",
   "start": 2245806,
   "end": 2252128
  }, {
   "filename": "/assets/Fish/Image/Fish/ClownFish/ClownFish.mpdi",
   "start": 2252128,
   "end": 2277940
  }, {
   "filename": "/assets/Fish/Image/Fish/ClownFish/ClownFish.pi",
   "start": 2277940,
   "end": 2283921
  }, {
   "filename": "/assets/Fish/Image/Fish/ClownFish/ClownFish.png",
   "start": 2283921,
   "end": 2322884
  }, {
   "filename": "/assets/Fish/Image/Fish/ClownFish/Thumbs.db",
   "start": 2322884,
   "end": 2371524
  }, {
   "filename": "/assets/Fish/Image/Fish/FlounderFish/FlounderFish.collision",
   "start": 2371524,
   "end": 2378285
  }, {
   "filename": "/assets/Fish/Image/Fish/FlounderFish/FlounderFish.mpdi",
   "start": 2378285,
   "end": 2390454
  }, {
   "filename": "/assets/Fish/Image/Fish/FlounderFish/FlounderFish.pi",
   "start": 2390454,
   "end": 2394367
  }, {
   "filename": "/assets/Fish/Image/Fish/FlounderFish/FlounderFish.png",
   "start": 2394367,
   "end": 2528636
  }, {
   "filename": "/assets/Fish/Image/Fish/FlounderFish/Thumbs.db",
   "start": 2528636,
   "end": 2588028
  }, {
   "filename": "/assets/Fish/Image/Fish/JellyFish/JellyFish.collision",
   "start": 2588028,
   "end": 2592136
  }, {
   "filename": "/assets/Fish/Image/Fish/JellyFish/JellyFish.mpdi",
   "start": 2592136,
   "end": 2613872
  }, {
   "filename": "/assets/Fish/Image/Fish/JellyFish/JellyFish.pi",
   "start": 2613872,
   "end": 2616876
  }, {
   "filename": "/assets/Fish/Image/Fish/JellyFish/JellyFish.png",
   "start": 2616876,
   "end": 2707994
  }, {
   "filename": "/assets/Fish/Image/Fish/JellyFish/Thumbs.db",
   "start": 2707994,
   "end": 2841626
  }, {
   "filename": "/assets/Fish/Image/Fish/KnifeFish/KnifeFish.collision",
   "start": 2841626,
   "end": 2845031
  }, {
   "filename": "/assets/Fish/Image/Fish/KnifeFish/KnifeFish.mpdi",
   "start": 2845031,
   "end": 2859257
  }, {
   "filename": "/assets/Fish/Image/Fish/KnifeFish/KnifeFish.pi",
   "start": 2859257,
   "end": 2863043
  }, {
   "filename": "/assets/Fish/Image/Fish/KnifeFish/KnifeFish.png",
   "start": 2863043,
   "end": 2901143
  }, {
   "filename": "/assets/Fish/Image/Fish/KnifeFish/Thumbs.db",
   "start": 2901143,
   "end": 2948759
  }, {
   "filename": "/assets/Fish/Image/Fish/PufferFish/PufferFish.collision",
   "start": 2948759,
   "end": 2952329
  }, {
   "filename": "/assets/Fish/Image/Fish/PufferFish/PufferFish.mpdi",
   "start": 2952329,
   "end": 2971054
  }, {
   "filename": "/assets/Fish/Image/Fish/PufferFish/PufferFish.pi",
   "start": 2971054,
   "end": 2975553
  }, {
   "filename": "/assets/Fish/Image/Fish/PufferFish/PufferFish.png",
   "start": 2975553,
   "end": 3033249
  }, {
   "filename": "/assets/Fish/Image/Fish/PufferFish/Thumbs.db",
   "start": 3033249,
   "end": 3112097
  }, {
   "filename": "/assets/Fish/Image/Fish/SquidFish/SquidFish.collision",
   "start": 3112097,
   "end": 3119075
  }, {
   "filename": "/assets/Fish/Image/Fish/SquidFish/SquidFish.mpdi",
   "start": 3119075,
   "end": 3153132
  }, {
   "filename": "/assets/Fish/Image/Fish/SquidFish/SquidFish.pi",
   "start": 3153132,
   "end": 3159224
  }, {
   "filename": "/assets/Fish/Image/Fish/SquidFish/SquidFish.png",
   "start": 3159224,
   "end": 3193702
  }, {
   "filename": "/assets/Fish/Image/Fish/SquidFish/Thumbs.db",
   "start": 3193702,
   "end": 3242854
  }, {
   "filename": "/assets/Fish/Image/Fish/StingrayFish/StingrayFish.collision",
   "start": 3242854,
   "end": 3247432
  }, {
   "filename": "/assets/Fish/Image/Fish/StingrayFish/StingrayFish.mpdi",
   "start": 3247432,
   "end": 3267633
  }, {
   "filename": "/assets/Fish/Image/Fish/StingrayFish/StingrayFish.pi",
   "start": 3267633,
   "end": 3274216
  }, {
   "filename": "/assets/Fish/Image/Fish/StingrayFish/StingrayFish.png",
   "start": 3274216,
   "end": 3432675
  }, {
   "filename": "/assets/Fish/Image/Fish/StingrayFish/StingrayFish1.pi",
   "start": 3432675,
   "end": 3439259
  }, {
   "filename": "/assets/Fish/Image/Fish/StingrayFish/StingrayFish1.png",
   "start": 3439259,
   "end": 3612337
  }, {
   "filename": "/assets/Fish/Image/Fish/StingrayFish/Thumbs.db",
   "start": 3612337,
   "end": 3746993
  }, {
   "filename": "/assets/Fish/Image/Fish/ThreeFish/ThreeFish.collision",
   "start": 3746993,
   "end": 3753222
  }, {
   "filename": "/assets/Fish/Image/Fish/ThreeFish/ThreeFish.mpdi",
   "start": 3753222,
   "end": 3766511
  }, {
   "filename": "/assets/Fish/Image/Fish/ThreeFish/ThreeFish.pi",
   "start": 3766511,
   "end": 3772329
  }, {
   "filename": "/assets/Fish/Image/Fish/ThreeFish/ThreeFish.png",
   "start": 3772329,
   "end": 3826336
  }, {
   "filename": "/assets/Fish/Image/Fish/ThreeFish/Thumbs.db",
   "start": 3826336,
   "end": 3899552
  }, {
   "filename": "/assets/Fish/Image/Fish/TurtleFish/Thumbs.db",
   "start": 3899552,
   "end": 3961504
  }, {
   "filename": "/assets/Fish/Image/Fish/TurtleFish/TurtleFish.collision",
   "start": 3961504,
   "end": 3969126
  }, {
   "filename": "/assets/Fish/Image/Fish/TurtleFish/TurtleFish.mpdi",
   "start": 3969126,
   "end": 3999716
  }, {
   "filename": "/assets/Fish/Image/Fish/TurtleFish/TurtleFish.pi",
   "start": 3999716,
   "end": 4006118
  }, {
   "filename": "/assets/Fish/Image/Fish/TurtleFish/TurtleFish.png",
   "start": 4006118,
   "end": 4140985
  }, {
   "filename": "/assets/Fish/Image/PlayerUI/Cannon_0001.mpdi",
   "start": 4140985,
   "end": 6405376
  }, {
   "filename": "/assets/Fish/Image/PlayerUI/Cannon_0001.pi",
   "start": 6405376,
   "end": 6431081
  }, {
   "filename": "/assets/Fish/Image/PlayerUI/Cannon_0001.png",
   "start": 6431081,
   "end": 6657781
  }, {
   "filename": "/assets/Fish/Image/PlayerUI/PlayerUI.mpdi",
   "start": 6657781,
   "end": 6660839
  }, {
   "filename": "/assets/Fish/Image/PlayerUI/PlayerUI.pi",
   "start": 6660839,
   "end": 6668681
  }, {
   "filename": "/assets/Fish/Image/PlayerUI/PlayerUI.png",
   "start": 6668681,
   "end": 6708947
  }, {
   "filename": "/assets/Fish/MiniGame/MiniGameSetup.xml",
   "start": 6708947,
   "end": 6711396
  }, {
   "filename": "/assets/Fish/MonsterData/AI/AnglerFish.fai",
   "start": 6711396,
   "end": 6712274
  }, {
   "filename": "/assets/Fish/MonsterData/AI/BigFour001.fai",
   "start": 6712274,
   "end": 6713178
  }, {
   "filename": "/assets/Fish/MonsterData/AI/BigFour002.fai",
   "start": 6713178,
   "end": 6714083
  }, {
   "filename": "/assets/Fish/MonsterData/AI/BigFour003.fai",
   "start": 6714083,
   "end": 6714990
  }, {
   "filename": "/assets/Fish/MonsterData/AI/BigThree001.fai",
   "start": 6714990,
   "end": 6715899
  }, {
   "filename": "/assets/Fish/MonsterData/AI/BigThree002.fai",
   "start": 6715899,
   "end": 6716811
  }, {
   "filename": "/assets/Fish/MonsterData/AI/BigThree003.fai",
   "start": 6716811,
   "end": 6717720
  }, {
   "filename": "/assets/Fish/MonsterData/AI/BigThree004.fai",
   "start": 6717720,
   "end": 6718629
  }, {
   "filename": "/assets/Fish/MonsterData/AI/BlackFish.fai",
   "start": 6718629,
   "end": 6719530
  }, {
   "filename": "/assets/Fish/MonsterData/AI/BlueFish.fai",
   "start": 6719530,
   "end": 6720456
  }, {
   "filename": "/assets/Fish/MonsterData/AI/ClownFish.fai",
   "start": 6720456,
   "end": 6721333
  }, {
   "filename": "/assets/Fish/MonsterData/AI/FlounderFish.fai",
   "start": 6721333,
   "end": 6722224
  }, {
   "filename": "/assets/Fish/MonsterData/AI/GoldDragon.fai",
   "start": 6722224,
   "end": 6723074
  }, {
   "filename": "/assets/Fish/MonsterData/AI/HammerheadFish.fai",
   "start": 6723074,
   "end": 6723952
  }, {
   "filename": "/assets/Fish/MonsterData/AI/JellyFish.fai",
   "start": 6723952,
   "end": 6724825
  }, {
   "filename": "/assets/Fish/MonsterData/AI/KnifeFish.fai",
   "start": 6724825,
   "end": 6725698
  }, {
   "filename": "/assets/Fish/MonsterData/AI/MarlinFish.fai",
   "start": 6725698,
   "end": 6726604
  }, {
   "filename": "/assets/Fish/MonsterData/AI/MinigameFish.fai",
   "start": 6726604,
   "end": 6727501
  }, {
   "filename": "/assets/Fish/MonsterData/AI/PufferFish.fai",
   "start": 6727501,
   "end": 6728378
  }, {
   "filename": "/assets/Fish/MonsterData/AI/SquidFish.fai",
   "start": 6728378,
   "end": 6729252
  }, {
   "filename": "/assets/Fish/MonsterData/AI/StingrayFish.fai",
   "start": 6729252,
   "end": 6730168
  }, {
   "filename": "/assets/Fish/MonsterData/AI/ThreeFish.fai",
   "start": 6730168,
   "end": 6731041
  }, {
   "filename": "/assets/Fish/MonsterData/AI/TurtleFish.fai",
   "start": 6731041,
   "end": 6731920
  }, {
   "filename": "/assets/Fish/MonsterData/Boss/Boss.xml",
   "start": 6731920,
   "end": 6732233
  }, {
   "filename": "/assets/Fish/MonsterData/Boss/BossTurtleDefence.fai",
   "start": 6732233,
   "end": 6732905
  }, {
   "filename": "/assets/Fish/MonsterData/Boss/BossTurtleMoving.fai",
   "start": 6732905,
   "end": 6733927
  }, {
   "filename": "/assets/Fish/MonsterData/Boss/BossTurtleRandomlyRotation.fai",
   "start": 6733927,
   "end": 6734734
  }, {
   "filename": "/assets/Fish/MonsterData/FishData.xml",
   "start": 6734734,
   "end": 6744027
  }, {
   "filename": "/assets/Fish/MonsterData/Group/Group-AnglerFish.mpdi",
   "start": 6744027,
   "end": 6744734
  }, {
   "filename": "/assets/Fish/MonsterData/Group/Group-ClownFish.mpdi",
   "start": 6744734,
   "end": 6754559
  }, {
   "filename": "/assets/Fish/MonsterData/Group/Group-FlounderFish.mpdi",
   "start": 6754559,
   "end": 6757675
  }, {
   "filename": "/assets/Fish/MonsterData/Group/Group-JellyFish.mpdi",
   "start": 6757675,
   "end": 6760710
  }, {
   "filename": "/assets/Fish/MonsterData/Group/Group-KnifeFish.mpdi",
   "start": 6760710,
   "end": 6763018
  }, {
   "filename": "/assets/Fish/MonsterData/Group/Group-PufferFish.mpdi",
   "start": 6763018,
   "end": 6765344
  }, {
   "filename": "/assets/Fish/MonsterData/Group/Group-SquidFish.mpdi",
   "start": 6765344,
   "end": 6768382
  }, {
   "filename": "/assets/Fish/MonsterData/Group/Group-ThreeFish.mpdi",
   "start": 6768382,
   "end": 6770687
  }, {
   "filename": "/assets/Fish/MonsterData/Group/allfish.pi",
   "start": 6770687,
   "end": 6773822
  }, {
   "filename": "/assets/Fish/MonsterData/Group/allfish.png",
   "start": 6773822,
   "end": 6901833
  }, {
   "filename": "/assets/Fish/MonsterData/Path/AnglerFish.path",
   "start": 6901833,
   "end": 6908146
  }, {
   "filename": "/assets/Fish/MonsterData/Path/AnglerFishPath.mpdi",
   "start": 6908146,
   "end": 6915264
  }, {
   "filename": "/assets/Fish/MonsterData/Path/BlackFish.path",
   "start": 6915264,
   "end": 6921466
  }, {
   "filename": "/assets/Fish/MonsterData/Path/BlackFishPath.mpdi",
   "start": 6921466,
   "end": 6941420
  }, {
   "filename": "/assets/Fish/MonsterData/Path/BlueFish.mpdi",
   "start": 6941420,
   "end": 6957819
  }, {
   "filename": "/assets/Fish/MonsterData/Path/BlueFish.path",
   "start": 6957819,
   "end": 6965506
  }, {
   "filename": "/assets/Fish/MonsterData/Path/BlueFishPath.mpdi",
   "start": 6965506,
   "end": 6997061
  }, {
   "filename": "/assets/Fish/MonsterData/Path/ClownFish.path",
   "start": 6997061,
   "end": 7006276
  }, {
   "filename": "/assets/Fish/MonsterData/Path/ClownFishPath.mpdi",
   "start": 7006276,
   "end": 7057889
  }, {
   "filename": "/assets/Fish/MonsterData/Path/FlounderFish.path",
   "start": 7057889,
   "end": 7066865
  }, {
   "filename": "/assets/Fish/MonsterData/Path/FlounderFishPath.mpdi",
   "start": 7066865,
   "end": 7117948
  }, {
   "filename": "/assets/Fish/MonsterData/Path/GoldDragon.path",
   "start": 7117948,
   "end": 7122747
  }, {
   "filename": "/assets/Fish/MonsterData/Path/GoldDragonPath.mpdi",
   "start": 7122747,
   "end": 7148789
  }, {
   "filename": "/assets/Fish/MonsterData/Path/GoldKenmu.path",
   "start": 7148789,
   "end": 7152118
  }, {
   "filename": "/assets/Fish/MonsterData/Path/GoldKenmuPath.mpdi",
   "start": 7152118,
   "end": 7164448
  }, {
   "filename": "/assets/Fish/MonsterData/Path/HammerheadFish.path",
   "start": 7164448,
   "end": 7167882
  }, {
   "filename": "/assets/Fish/MonsterData/Path/HammerheadFishPath.mpdi",
   "start": 7167882,
   "end": 7182595
  }, {
   "filename": "/assets/Fish/MonsterData/Path/JellyFish.mpdi",
   "start": 7182595,
   "end": 7199535
  }, {
   "filename": "/assets/Fish/MonsterData/Path/JellyFish.path",
   "start": 7199535,
   "end": 7204311
  }, {
   "filename": "/assets/Fish/MonsterData/Path/JellyFishPath.mpdi",
   "start": 7204311,
   "end": 7239377
  }, {
   "filename": "/assets/Fish/MonsterData/Path/KnifeFish.mpdi",
   "start": 7239377,
   "end": 7254841
  }, {
   "filename": "/assets/Fish/MonsterData/Path/KnifeFish.path",
   "start": 7254841,
   "end": 7259679
  }, {
   "filename": "/assets/Fish/MonsterData/Path/KnifeFishPath.mpdi",
   "start": 7259679,
   "end": 7311519
  }, {
   "filename": "/assets/Fish/MonsterData/Path/MarlinFish.path",
   "start": 7311519,
   "end": 7315367
  }, {
   "filename": "/assets/Fish/MonsterData/Path/MarlinFishPath.mpdi",
   "start": 7315367,
   "end": 7338785
  }, {
   "filename": "/assets/Fish/MonsterData/Path/Middle Fish.mpdi",
   "start": 7338785,
   "end": 7551311
  }, {
   "filename": "/assets/Fish/MonsterData/Path/MinigameFish.path",
   "start": 7551311,
   "end": 7557902
  }, {
   "filename": "/assets/Fish/MonsterData/Path/Path_GoldDragon.mpdi",
   "start": 7557902,
   "end": 7562881
  }, {
   "filename": "/assets/Fish/MonsterData/Path/PufferFish.path",
   "start": 7562881,
   "end": 7567818
  }, {
   "filename": "/assets/Fish/MonsterData/Path/PufferFishPath.mpdi",
   "start": 7567818,
   "end": 7616826
  }, {
   "filename": "/assets/Fish/MonsterData/Path/Small Fish.mpdi",
   "start": 7616826,
   "end": 7748970
  }, {
   "filename": "/assets/Fish/MonsterData/Path/SquidFish.path",
   "start": 7748970,
   "end": 7756295
  }, {
   "filename": "/assets/Fish/MonsterData/Path/SquidFish.png",
   "start": 7756295,
   "end": 7759433
  }, {
   "filename": "/assets/Fish/MonsterData/Path/SquidFishPath.mpdi",
   "start": 7759433,
   "end": 7797131
  }, {
   "filename": "/assets/Fish/MonsterData/Path/StingrayFish.path",
   "start": 7797131,
   "end": 7803585
  }, {
   "filename": "/assets/Fish/MonsterData/Path/StingrayFishPath.mpdi",
   "start": 7803585,
   "end": 7845955
  }, {
   "filename": "/assets/Fish/MonsterData/Path/ThreeFish.mpdi",
   "start": 7845955,
   "end": 7865687
  }, {
   "filename": "/assets/Fish/MonsterData/Path/ThreeFish.path",
   "start": 7865687,
   "end": 7870158
  }, {
   "filename": "/assets/Fish/MonsterData/Path/ThreeFishPath.mpdi",
   "start": 7870158,
   "end": 7919441
  }, {
   "filename": "/assets/Fish/MonsterData/Path/TurtleFish.path",
   "start": 7919441,
   "end": 7924938
  }, {
   "filename": "/assets/Fish/MonsterData/Path/TurtleFishPath.mpdi",
   "start": 7924938,
   "end": 7968616
  }, {
   "filename": "/assets/Fish/MonsterData/Path/TutrleBossMovingPath.mpdi",
   "start": 7968616,
   "end": 7973194
  }, {
   "filename": "/assets/Fish/MonsterData/Path/TutrleBossMovingPath.path",
   "start": 7973194,
   "end": 7974613
  }, {
   "filename": "/assets/Fish/MonsterData/Path/allfish.pi",
   "start": 7974613,
   "end": 7977713
  }, {
   "filename": "/assets/Fish/MonsterData/Path/allfish.png",
   "start": 7977713,
   "end": 8196250
  }, {
   "filename": "/assets/Fish/Particle/666.prt",
   "start": 8196250,
   "end": 8198379
  }, {
   "filename": "/assets/Fish/Particle/Default.PNG",
   "start": 8198379,
   "end": 8201983
  }, {
   "filename": "/assets/Fish/Player/PlayerData1.xml",
   "start": 8201983,
   "end": 8203636
  }, {
   "filename": "/assets/Fish/Probability/BankFormatProbability.xml",
   "start": 8203636,
   "end": 8207447
  }, {
   "filename": "/assets/Fish/Probability/Probability.xml",
   "start": 8207447,
   "end": 8207604
  }, {
   "filename": "/assets/Fish/Probability/ProbabilityXMLSechma.xml",
   "start": 8207604,
   "end": 8208770
  }, {
   "filename": "/assets/Font.FontInfo",
   "start": 8208770,
   "end": 8292692
  }, {
   "filename": "/assets/Font.png",
   "start": 8292692,
   "end": 8330965
  } ],
  "remote_package_size": 8330965
 });
})();

var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = (status, toThrow) => {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = typeof window == "object";

var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";

var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary, setWindowTitle;

if (ENVIRONMENT_IS_NODE) {
 var fs = require("fs");
 var nodePath = require("path");
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = nodePath.dirname(scriptDirectory) + "/";
 } else {
  scriptDirectory = __dirname + "/";
 }
 read_ = (filename, binary) => {
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  return fs.readFileSync(filename, binary ? undefined : "utf8");
 };
 readBinary = filename => {
  var ret = read_(filename, true);
  if (!ret.buffer) {
   ret = new Uint8Array(ret);
  }
  return ret;
 };
 readAsync = (filename, onload, onerror, binary = true) => {
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  fs.readFile(filename, binary ? undefined : "utf8", (err, data) => {
   if (err) onerror(err); else onload(binary ? data.buffer : data);
  });
 };
 if (!Module["thisProgram"] && process.argv.length > 1) {
  thisProgram = process.argv[1].replace(/\\/g, "/");
 }
 arguments_ = process.argv.slice(2);
 if (typeof module != "undefined") {
  module["exports"] = Module;
 }
 process.on("uncaughtException", ex => {
  if (ex !== "unwind" && !(ex instanceof ExitStatus) && !(ex.context instanceof ExitStatus)) {
   throw ex;
  }
 });
 quit_ = (status, toThrow) => {
  process.exitCode = status;
  throw toThrow;
 };
 Module["inspect"] = () => "[Emscripten Module object]";
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (typeof document != "undefined" && document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (scriptDirectory.indexOf("blob:") !== 0) {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
 } else {
  scriptDirectory = "";
 }
 {
  read_ = url => {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, false);
   xhr.send(null);
   return xhr.responseText;
  };
  if (ENVIRONMENT_IS_WORKER) {
   readBinary = url => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
    return new Uint8Array(xhr.response);
   };
  }
  readAsync = (url, onload, onerror) => {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, true);
   xhr.responseType = "arraybuffer";
   xhr.onload = () => {
    if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
     onload(xhr.response);
     return;
    }
    onerror();
   };
   xhr.onerror = onerror;
   xhr.send(null);
  };
 }
 setWindowTitle = title => document.title = title;
} else {}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.error.bind(console);

Object.assign(Module, moduleOverrides);

moduleOverrides = null;

if (Module["arguments"]) arguments_ = Module["arguments"];

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

if (Module["quit"]) quit_ = Module["quit"];

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

var noExitRuntime = Module["noExitRuntime"] || true;

if (typeof WebAssembly != "object") {
 abort("no native wasm support detected");
}

var wasmMemory;

var ABORT = false;

var EXITSTATUS;

function assert(condition, text) {
 if (!condition) {
  abort(text);
 }
}

var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

function updateMemoryViews() {
 var b = wasmMemory.buffer;
 Module["HEAP8"] = HEAP8 = new Int8Array(b);
 Module["HEAP16"] = HEAP16 = new Int16Array(b);
 Module["HEAP32"] = HEAP32 = new Int32Array(b);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
}

var wasmTable;

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATMAIN__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

var runtimeKeepaliveCounter = 0;

function keepRuntimeAlive() {
 return noExitRuntime || runtimeKeepaliveCounter > 0;
}

function preRun() {
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 runtimeInitialized = true;
 if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
 FS.ignorePermissions = false;
 TTY.init();
 callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
 callRuntimeCallbacks(__ATMAIN__);
}

function postRun() {
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
 __ATINIT__.unshift(cb);
}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

function getUniqueRunDependency(id) {
 return id;
}

function addRunDependency(id) {
 runDependencies++;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
}

function removeRunDependency(id) {
 runDependencies--;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

function abort(what) {
 if (Module["onAbort"]) {
  Module["onAbort"](what);
 }
 what = "Aborted(" + what + ")";
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 what += ". Build with -sASSERTIONS for more info.";
 var e = new WebAssembly.RuntimeError(what);
 throw e;
}

var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
 return filename.startsWith(dataURIPrefix);
}

function isFileURI(filename) {
 return filename.startsWith("file://");
}

var wasmBinaryFile;

wasmBinaryFile = "FTCEmscripten.wasm";

if (!isDataURI(wasmBinaryFile)) {
 wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinary(file) {
 try {
  if (file == wasmBinaryFile && wasmBinary) {
   return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
   return readBinary(file);
  }
  throw "both async and sync fetching of the wasm failed";
 } catch (err) {
  abort(err);
 }
}

function getBinaryPromise(binaryFile) {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
  if (typeof fetch == "function" && !isFileURI(binaryFile)) {
   return fetch(binaryFile, {
    credentials: "same-origin"
   }).then(response => {
    if (!response["ok"]) {
     throw "failed to load wasm binary file at '" + binaryFile + "'";
    }
    return response["arrayBuffer"]();
   }).catch(() => getBinary(binaryFile));
  } else {
   if (readAsync) {
    return new Promise((resolve, reject) => {
     readAsync(binaryFile, response => resolve(new Uint8Array(response)), reject);
    });
   }
  }
 }
 return Promise.resolve().then(() => getBinary(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
 return getBinaryPromise(binaryFile).then(binary => {
  return WebAssembly.instantiate(binary, imports);
 }).then(instance => {
  return instance;
 }).then(receiver, reason => {
  err("failed to asynchronously prepare wasm: " + reason);
  abort(reason);
 });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
 if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && !isFileURI(binaryFile) && !ENVIRONMENT_IS_NODE && typeof fetch == "function") {
  return fetch(binaryFile, {
   credentials: "same-origin"
  }).then(response => {
   var result = WebAssembly.instantiateStreaming(response, imports);
   return result.then(callback, function(reason) {
    err("wasm streaming compile failed: " + reason);
    err("falling back to ArrayBuffer instantiation");
    return instantiateArrayBuffer(binaryFile, imports, callback);
   });
  });
 } else {
  return instantiateArrayBuffer(binaryFile, imports, callback);
 }
}

function createWasm() {
 var info = {
  "a": wasmImports
 };
 function receiveInstance(instance, module) {
  var exports = instance.exports;
  Module["asm"] = exports;
  wasmMemory = Module["asm"]["sb"];
  updateMemoryViews();
  wasmTable = Module["asm"]["vb"];
  addOnInit(Module["asm"]["tb"]);
  removeRunDependency("wasm-instantiate");
  return exports;
 }
 addRunDependency("wasm-instantiate");
 function receiveInstantiationResult(result) {
  receiveInstance(result["instance"]);
 }
 if (Module["instantiateWasm"]) {
  try {
   return Module["instantiateWasm"](info, receiveInstance);
  } catch (e) {
   err("Module.instantiateWasm callback failed with error: " + e);
   return false;
  }
 }
 instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult);
 return {};
}

var tempDouble;

var tempI64;

var ASM_CONSTS = {
 313277: () => {
  Module.IndexedDBName = "/GameApp";
  FS.mkdir(Module.IndexedDBName);
  FS.mount(IDBFS, {}, Module.IndexedDBName);
  Module.print("start file sync");
  Module.syncdone = 0;
  Module.WaitAllFileFinish = 1;
  FS.syncfs(true, function(err) {
   if (err) {
    console.log("ERROR!", err);
   }
   Module.syncdone = 1;
   console.log("/GameApp mount sync finished ");
  });
 },
 313615: () => {
  Module.print("all file downloaded do IndexedDB sync..");
  Module.syncdone = 0;
  FS.syncfs(false, function(err) {
   if (err) {
    console.log("ERROR!", err);
   }
   Module.print("End File sync..");
   Module.syncdone = 1;
   Module.WaitAllFileFinish = 0;
  });
 }
};

function WASM_Is_IOS() {
 return [ "iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod" ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}

function WASM_JSInit() {
 canvas.onfullscreenchange = event => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
 };
}

function WASM_Fullscreen() {
 if (!WASM_Is_IOS()) {
  if (!document.fullscreenElement) {
   console.log("WASM_Fullscreen called\n");
   document.documentElement.requestFullscreen();
  } else {
   if (document.exitFullscreen) {
    document.exitFullscreen();
   }
  }
 }
}

function WASM_GetBrowserWidth() {
 return window.innerWidth;
}

function WASM_GetBrowserHeight() {
 return window.innerHeight;
}

function WASM_JSViewportUpdate() {
 if (canvas.width != window.innerWidth - 20) {
  canvas.width = window.innerWidth - 20;
 }
 if (canvas.height != window.innerHeight - 30) {
  canvas.height = window.innerHeight - 30;
 }
}

function WASM_GetViewportWidth() {
 return canvas.width;
}

function WASM_GetViewportHeight() {
 return canvas.height;
}

function WASM_IsPC() {
 if (typeof screen.orientation !== "undefined") {
  return false;
 }
 return true;
}

function WASM_get_CanvasPosY() {
 if (!WASM_IsPC()) {
  var scrollPos = document.getElementsByTagName("html")[0].scrollTop;
  return scrollPos;
 }
 return 0;
}

function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = `Program terminated with exit(${status})`;
 this.status = status;
}

var callRuntimeCallbacks = callbacks => {
 while (callbacks.length > 0) {
  callbacks.shift()(Module);
 }
};

var PATH = {
 isAbs: path => path.charAt(0) === "/",
 splitPath: filename => {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 },
 normalizeArray: (parts, allowAboveRoot) => {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (;up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 },
 normalize: path => {
  var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 },
 dirname: path => {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 },
 basename: path => {
  if (path === "/") return "/";
  path = PATH.normalize(path);
  path = path.replace(/\/$/, "");
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 },
 join: function() {
  var paths = Array.prototype.slice.call(arguments);
  return PATH.normalize(paths.join("/"));
 },
 join2: (l, r) => {
  return PATH.normalize(l + "/" + r);
 }
};

function _emscripten_set_main_loop_timing(mode, value) {
 Browser.mainLoop.timingMode = mode;
 Browser.mainLoop.timingValue = value;
 if (!Browser.mainLoop.func) {
  return 1;
 }
 if (!Browser.mainLoop.running) {
  Browser.mainLoop.running = true;
 }
 if (mode == 0) {
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
   var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
   setTimeout(Browser.mainLoop.runner, timeUntilNextTick);
  };
  Browser.mainLoop.method = "timeout";
 } else if (mode == 1) {
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
   Browser.requestAnimationFrame(Browser.mainLoop.runner);
  };
  Browser.mainLoop.method = "rAF";
 } else if (mode == 2) {
  if (typeof setImmediate == "undefined") {
   var setImmediates = [];
   var emscriptenMainLoopMessageId = "setimmediate";
   var Browser_setImmediate_messageHandler = event => {
    if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
     event.stopPropagation();
     setImmediates.shift()();
    }
   };
   addEventListener("message", Browser_setImmediate_messageHandler, true);
   setImmediate = function Browser_emulated_setImmediate(func) {
    setImmediates.push(func);
    if (ENVIRONMENT_IS_WORKER) {
     if (Module["setImmediates"] === undefined) Module["setImmediates"] = [];
     Module["setImmediates"].push(func);
     postMessage({
      target: emscriptenMainLoopMessageId
     });
    } else postMessage(emscriptenMainLoopMessageId, "*");
   };
  }
  Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
   setImmediate(Browser.mainLoop.runner);
  };
  Browser.mainLoop.method = "immediate";
 }
 return 0;
}

var _emscripten_get_now;

_emscripten_get_now = () => performance.now();

function setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop, arg, noSetTiming) {
 assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
 Browser.mainLoop.func = browserIterationFunc;
 Browser.mainLoop.arg = arg;
 var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
 function checkIsRunning() {
  if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
   return false;
  }
  return true;
 }
 Browser.mainLoop.running = false;
 Browser.mainLoop.runner = function Browser_mainLoop_runner() {
  if (ABORT) return;
  if (Browser.mainLoop.queue.length > 0) {
   var start = Date.now();
   var blocker = Browser.mainLoop.queue.shift();
   blocker.func(blocker.arg);
   if (Browser.mainLoop.remainingBlockers) {
    var remaining = Browser.mainLoop.remainingBlockers;
    var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
    if (blocker.counted) {
     Browser.mainLoop.remainingBlockers = next;
    } else {
     next = next + .5;
     Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9;
    }
   }
   out('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + " ms");
   Browser.mainLoop.updateStatus();
   if (!checkIsRunning()) return;
   setTimeout(Browser.mainLoop.runner, 0);
   return;
  }
  if (!checkIsRunning()) return;
  Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
  if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
   Browser.mainLoop.scheduler();
   return;
  } else if (Browser.mainLoop.timingMode == 0) {
   Browser.mainLoop.tickStartTime = _emscripten_get_now();
  }
  GL.newRenderingFrameStarted();
  Browser.mainLoop.runIter(browserIterationFunc);
  if (!checkIsRunning()) return;
  if (typeof SDL == "object" && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData();
  Browser.mainLoop.scheduler();
 };
 if (!noSetTiming) {
  if (fps && fps > 0) {
   _emscripten_set_main_loop_timing(0, 1e3 / fps);
  } else {
   _emscripten_set_main_loop_timing(1, 1);
  }
  Browser.mainLoop.scheduler();
 }
 if (simulateInfiniteLoop) {
  throw "unwind";
 }
}

var handleException = e => {
 if (e instanceof ExitStatus || e == "unwind") {
  return EXITSTATUS;
 }
 quit_(1, e);
};

var initRandomFill = () => {
 if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
  return view => crypto.getRandomValues(view);
 } else if (ENVIRONMENT_IS_NODE) {
  try {
   var crypto_module = require("crypto");
   var randomFillSync = crypto_module["randomFillSync"];
   if (randomFillSync) {
    return view => crypto_module["randomFillSync"](view);
   }
   var randomBytes = crypto_module["randomBytes"];
   return view => (view.set(randomBytes(view.byteLength)), view);
  } catch (e) {}
 }
 abort("initRandomDevice");
};

var randomFill = view => {
 return (randomFill = initRandomFill())(view);
};

var PATH_FS = {
 resolve: function() {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
   var path = i >= 0 ? arguments[i] : FS.cwd();
   if (typeof path != "string") {
    throw new TypeError("Arguments to path.resolve must be strings");
   } else if (!path) {
    return "";
   }
   resolvedPath = path + "/" + resolvedPath;
   resolvedAbsolute = PATH.isAbs(path);
  }
  resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/");
  return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
 },
 relative: (from, to) => {
  from = PATH_FS.resolve(from).substr(1);
  to = PATH_FS.resolve(to).substr(1);
  function trim(arr) {
   var start = 0;
   for (;start < arr.length; start++) {
    if (arr[start] !== "") break;
   }
   var end = arr.length - 1;
   for (;end >= 0; end--) {
    if (arr[end] !== "") break;
   }
   if (start > end) return [];
   return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
   if (fromParts[i] !== toParts[i]) {
    samePartsLength = i;
    break;
   }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
   outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
 }
};

var lengthBytesUTF8 = str => {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var c = str.charCodeAt(i);
  if (c <= 127) {
   len++;
  } else if (c <= 2047) {
   len += 2;
  } else if (c >= 55296 && c <= 57343) {
   len += 4;
   ++i;
  } else {
   len += 3;
  }
 }
 return len;
};

var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | u1 & 1023;
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   heap[outIdx++] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   heap[outIdx++] = 192 | u >> 6;
   heap[outIdx++] = 128 | u & 63;
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   heap[outIdx++] = 224 | u >> 12;
   heap[outIdx++] = 128 | u >> 6 & 63;
   heap[outIdx++] = 128 | u & 63;
  } else {
   if (outIdx + 3 >= endIdx) break;
   heap[outIdx++] = 240 | u >> 18;
   heap[outIdx++] = 128 | u >> 12 & 63;
   heap[outIdx++] = 128 | u >> 6 & 63;
   heap[outIdx++] = 128 | u & 63;
  }
 }
 heap[outIdx] = 0;
 return outIdx - startIdx;
};

function intArrayFromString(stringy, dontAddNull, length) {
 var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
 var u8array = new Array(len);
 var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
 if (dontAddNull) u8array.length = numBytesWritten;
 return u8array;
}

var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;

var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
 var endIdx = idx + maxBytesToRead;
 var endPtr = idx;
 while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
 if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
  return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
 }
 var str = "";
 while (idx < endPtr) {
  var u0 = heapOrArray[idx++];
  if (!(u0 & 128)) {
   str += String.fromCharCode(u0);
   continue;
  }
  var u1 = heapOrArray[idx++] & 63;
  if ((u0 & 224) == 192) {
   str += String.fromCharCode((u0 & 31) << 6 | u1);
   continue;
  }
  var u2 = heapOrArray[idx++] & 63;
  if ((u0 & 240) == 224) {
   u0 = (u0 & 15) << 12 | u1 << 6 | u2;
  } else {
   u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
  }
  if (u0 < 65536) {
   str += String.fromCharCode(u0);
  } else {
   var ch = u0 - 65536;
   str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
  }
 }
 return str;
};

var TTY = {
 ttys: [],
 init: function() {},
 shutdown: function() {},
 register: function(dev, ops) {
  TTY.ttys[dev] = {
   input: [],
   output: [],
   ops: ops
  };
  FS.registerDevice(dev, TTY.stream_ops);
 },
 stream_ops: {
  open: function(stream) {
   var tty = TTY.ttys[stream.node.rdev];
   if (!tty) {
    throw new FS.ErrnoError(43);
   }
   stream.tty = tty;
   stream.seekable = false;
  },
  close: function(stream) {
   stream.tty.ops.fsync(stream.tty);
  },
  fsync: function(stream) {
   stream.tty.ops.fsync(stream.tty);
  },
  read: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.get_char) {
    throw new FS.ErrnoError(60);
   }
   var bytesRead = 0;
   for (var i = 0; i < length; i++) {
    var result;
    try {
     result = stream.tty.ops.get_char(stream.tty);
    } catch (e) {
     throw new FS.ErrnoError(29);
    }
    if (result === undefined && bytesRead === 0) {
     throw new FS.ErrnoError(6);
    }
    if (result === null || result === undefined) break;
    bytesRead++;
    buffer[offset + i] = result;
   }
   if (bytesRead) {
    stream.node.timestamp = Date.now();
   }
   return bytesRead;
  },
  write: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.put_char) {
    throw new FS.ErrnoError(60);
   }
   try {
    for (var i = 0; i < length; i++) {
     stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
    }
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
   if (length) {
    stream.node.timestamp = Date.now();
   }
   return i;
  }
 },
 default_tty_ops: {
  get_char: function(tty) {
   if (!tty.input.length) {
    var result = null;
    if (ENVIRONMENT_IS_NODE) {
     var BUFSIZE = 256;
     var buf = Buffer.alloc(BUFSIZE);
     var bytesRead = 0;
     try {
      bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE, -1);
     } catch (e) {
      if (e.toString().includes("EOF")) bytesRead = 0; else throw e;
     }
     if (bytesRead > 0) {
      result = buf.slice(0, bytesRead).toString("utf-8");
     } else {
      result = null;
     }
    } else if (typeof window != "undefined" && typeof window.prompt == "function") {
     result = window.prompt("Input: ");
     if (result !== null) {
      result += "\n";
     }
    } else if (typeof readline == "function") {
     result = readline();
     if (result !== null) {
      result += "\n";
     }
    }
    if (!result) {
     return null;
    }
    tty.input = intArrayFromString(result, true);
   }
   return tty.input.shift();
  },
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  fsync: function(tty) {
   if (tty.output && tty.output.length > 0) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  },
  ioctl_tcgets: function(tty) {
   return {
    c_iflag: 25856,
    c_oflag: 5,
    c_cflag: 191,
    c_lflag: 35387,
    c_cc: [ 3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
   };
  },
  ioctl_tcsets: function(tty, optional_actions, data) {
   return 0;
  },
  ioctl_tiocgwinsz: function(tty) {
   return [ 24, 80 ];
  }
 },
 default_tty1_ops: {
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  fsync: function(tty) {
   if (tty.output && tty.output.length > 0) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 }
};

var zeroMemory = (address, size) => {
 HEAPU8.fill(0, address, address + size);
 return address;
};

var mmapAlloc = size => {
 abort();
};

var MEMFS = {
 ops_table: null,
 mount: function(mount) {
  return MEMFS.createNode(null, "/", 16384 | 511, 0);
 },
 createNode: function(parent, name, mode, dev) {
  if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
   throw new FS.ErrnoError(63);
  }
  if (!MEMFS.ops_table) {
   MEMFS.ops_table = {
    dir: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      lookup: MEMFS.node_ops.lookup,
      mknod: MEMFS.node_ops.mknod,
      rename: MEMFS.node_ops.rename,
      unlink: MEMFS.node_ops.unlink,
      rmdir: MEMFS.node_ops.rmdir,
      readdir: MEMFS.node_ops.readdir,
      symlink: MEMFS.node_ops.symlink
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek
     }
    },
    file: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek,
      read: MEMFS.stream_ops.read,
      write: MEMFS.stream_ops.write,
      allocate: MEMFS.stream_ops.allocate,
      mmap: MEMFS.stream_ops.mmap,
      msync: MEMFS.stream_ops.msync
     }
    },
    link: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      readlink: MEMFS.node_ops.readlink
     },
     stream: {}
    },
    chrdev: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: FS.chrdev_stream_ops
    }
   };
  }
  var node = FS.createNode(parent, name, mode, dev);
  if (FS.isDir(node.mode)) {
   node.node_ops = MEMFS.ops_table.dir.node;
   node.stream_ops = MEMFS.ops_table.dir.stream;
   node.contents = {};
  } else if (FS.isFile(node.mode)) {
   node.node_ops = MEMFS.ops_table.file.node;
   node.stream_ops = MEMFS.ops_table.file.stream;
   node.usedBytes = 0;
   node.contents = null;
  } else if (FS.isLink(node.mode)) {
   node.node_ops = MEMFS.ops_table.link.node;
   node.stream_ops = MEMFS.ops_table.link.stream;
  } else if (FS.isChrdev(node.mode)) {
   node.node_ops = MEMFS.ops_table.chrdev.node;
   node.stream_ops = MEMFS.ops_table.chrdev.stream;
  }
  node.timestamp = Date.now();
  if (parent) {
   parent.contents[name] = node;
   parent.timestamp = node.timestamp;
  }
  return node;
 },
 getFileDataAsTypedArray: function(node) {
  if (!node.contents) return new Uint8Array(0);
  if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
  return new Uint8Array(node.contents);
 },
 expandFileStorage: function(node, newCapacity) {
  var prevCapacity = node.contents ? node.contents.length : 0;
  if (prevCapacity >= newCapacity) return;
  var CAPACITY_DOUBLING_MAX = 1024 * 1024;
  newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
  if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
  var oldContents = node.contents;
  node.contents = new Uint8Array(newCapacity);
  if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
 },
 resizeFileStorage: function(node, newSize) {
  if (node.usedBytes == newSize) return;
  if (newSize == 0) {
   node.contents = null;
   node.usedBytes = 0;
  } else {
   var oldContents = node.contents;
   node.contents = new Uint8Array(newSize);
   if (oldContents) {
    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
   }
   node.usedBytes = newSize;
  }
 },
 node_ops: {
  getattr: function(node) {
   var attr = {};
   attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
   attr.ino = node.id;
   attr.mode = node.mode;
   attr.nlink = 1;
   attr.uid = 0;
   attr.gid = 0;
   attr.rdev = node.rdev;
   if (FS.isDir(node.mode)) {
    attr.size = 4096;
   } else if (FS.isFile(node.mode)) {
    attr.size = node.usedBytes;
   } else if (FS.isLink(node.mode)) {
    attr.size = node.link.length;
   } else {
    attr.size = 0;
   }
   attr.atime = new Date(node.timestamp);
   attr.mtime = new Date(node.timestamp);
   attr.ctime = new Date(node.timestamp);
   attr.blksize = 4096;
   attr.blocks = Math.ceil(attr.size / attr.blksize);
   return attr;
  },
  setattr: function(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
   if (attr.size !== undefined) {
    MEMFS.resizeFileStorage(node, attr.size);
   }
  },
  lookup: function(parent, name) {
   throw FS.genericErrors[44];
  },
  mknod: function(parent, name, mode, dev) {
   return MEMFS.createNode(parent, name, mode, dev);
  },
  rename: function(old_node, new_dir, new_name) {
   if (FS.isDir(old_node.mode)) {
    var new_node;
    try {
     new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (new_node) {
     for (var i in new_node.contents) {
      throw new FS.ErrnoError(55);
     }
    }
   }
   delete old_node.parent.contents[old_node.name];
   old_node.parent.timestamp = Date.now();
   old_node.name = new_name;
   new_dir.contents[new_name] = old_node;
   new_dir.timestamp = old_node.parent.timestamp;
   old_node.parent = new_dir;
  },
  unlink: function(parent, name) {
   delete parent.contents[name];
   parent.timestamp = Date.now();
  },
  rmdir: function(parent, name) {
   var node = FS.lookupNode(parent, name);
   for (var i in node.contents) {
    throw new FS.ErrnoError(55);
   }
   delete parent.contents[name];
   parent.timestamp = Date.now();
  },
  readdir: function(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  },
  symlink: function(parent, newname, oldpath) {
   var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
   node.link = oldpath;
   return node;
  },
  readlink: function(node) {
   if (!FS.isLink(node.mode)) {
    throw new FS.ErrnoError(28);
   }
   return node.link;
  }
 },
 stream_ops: {
  read: function(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= stream.node.usedBytes) return 0;
   var size = Math.min(stream.node.usedBytes - position, length);
   if (size > 8 && contents.subarray) {
    buffer.set(contents.subarray(position, position + size), offset);
   } else {
    for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
   }
   return size;
  },
  write: function(stream, buffer, offset, length, position, canOwn) {
   if (buffer.buffer === HEAP8.buffer) {
    canOwn = false;
   }
   if (!length) return 0;
   var node = stream.node;
   node.timestamp = Date.now();
   if (buffer.subarray && (!node.contents || node.contents.subarray)) {
    if (canOwn) {
     node.contents = buffer.subarray(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (node.usedBytes === 0 && position === 0) {
     node.contents = buffer.slice(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (position + length <= node.usedBytes) {
     node.contents.set(buffer.subarray(offset, offset + length), position);
     return length;
    }
   }
   MEMFS.expandFileStorage(node, position + length);
   if (node.contents.subarray && buffer.subarray) {
    node.contents.set(buffer.subarray(offset, offset + length), position);
   } else {
    for (var i = 0; i < length; i++) {
     node.contents[position + i] = buffer[offset + i];
    }
   }
   node.usedBytes = Math.max(node.usedBytes, position + length);
   return length;
  },
  llseek: function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.usedBytes;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  },
  allocate: function(stream, offset, length) {
   MEMFS.expandFileStorage(stream.node, offset + length);
   stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
  },
  mmap: function(stream, length, position, prot, flags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   var ptr;
   var allocated;
   var contents = stream.node.contents;
   if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
    allocated = false;
    ptr = contents.byteOffset;
   } else {
    if (position > 0 || position + length < contents.length) {
     if (contents.subarray) {
      contents = contents.subarray(position, position + length);
     } else {
      contents = Array.prototype.slice.call(contents, position, position + length);
     }
    }
    allocated = true;
    ptr = mmapAlloc(length);
    if (!ptr) {
     throw new FS.ErrnoError(48);
    }
    HEAP8.set(contents, ptr);
   }
   return {
    ptr: ptr,
    allocated: allocated
   };
  },
  msync: function(stream, buffer, offset, length, mmapFlags) {
   MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
   return 0;
  }
 }
};

var asyncLoad = (url, onload, onerror, noRunDep) => {
 var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : "";
 readAsync(url, arrayBuffer => {
  assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
  onload(new Uint8Array(arrayBuffer));
  if (dep) removeRunDependency(dep);
 }, event => {
  if (onerror) {
   onerror();
  } else {
   throw `Loading data file "${url}" failed.`;
  }
 });
 if (dep) addRunDependency(dep);
};

var preloadPlugins = Module["preloadPlugins"] || [];

function FS_handledByPreloadPlugin(byteArray, fullname, finish, onerror) {
 if (typeof Browser != "undefined") Browser.init();
 var handled = false;
 preloadPlugins.forEach(function(plugin) {
  if (handled) return;
  if (plugin["canHandle"](fullname)) {
   plugin["handle"](byteArray, fullname, finish, onerror);
   handled = true;
  }
 });
 return handled;
}

function FS_createPreloadedFile(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
 var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
 var dep = getUniqueRunDependency(`cp ${fullname}`);
 function processData(byteArray) {
  function finish(byteArray) {
   if (preFinish) preFinish();
   if (!dontCreateFile) {
    FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
   }
   if (onload) onload();
   removeRunDependency(dep);
  }
  if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
   if (onerror) onerror();
   removeRunDependency(dep);
  })) {
   return;
  }
  finish(byteArray);
 }
 addRunDependency(dep);
 if (typeof url == "string") {
  asyncLoad(url, byteArray => processData(byteArray), onerror);
 } else {
  processData(url);
 }
}

function FS_modeStringToFlags(str) {
 var flagModes = {
  "r": 0,
  "r+": 2,
  "w": 512 | 64 | 1,
  "w+": 512 | 64 | 2,
  "a": 1024 | 64 | 1,
  "a+": 1024 | 64 | 2
 };
 var flags = flagModes[str];
 if (typeof flags == "undefined") {
  throw new Error(`Unknown file open mode: ${str}`);
 }
 return flags;
}

function FS_getMode(canRead, canWrite) {
 var mode = 0;
 if (canRead) mode |= 292 | 73;
 if (canWrite) mode |= 146;
 return mode;
}

var IDBFS = {
 dbs: {},
 indexedDB: () => {
  if (typeof indexedDB != "undefined") return indexedDB;
  var ret = null;
  if (typeof window == "object") ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  assert(ret, "IDBFS used, but indexedDB not supported");
  return ret;
 },
 DB_VERSION: 21,
 DB_STORE_NAME: "FILE_DATA",
 mount: function(mount) {
  return MEMFS.mount.apply(null, arguments);
 },
 syncfs: (mount, populate, callback) => {
  IDBFS.getLocalSet(mount, (err, local) => {
   if (err) return callback(err);
   IDBFS.getRemoteSet(mount, (err, remote) => {
    if (err) return callback(err);
    var src = populate ? remote : local;
    var dst = populate ? local : remote;
    IDBFS.reconcile(src, dst, callback);
   });
  });
 },
 quit: () => {
  Object.values(IDBFS.dbs).forEach(value => value.close());
  IDBFS.dbs = {};
 },
 getDB: (name, callback) => {
  var db = IDBFS.dbs[name];
  if (db) {
   return callback(null, db);
  }
  var req;
  try {
   req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
  } catch (e) {
   return callback(e);
  }
  if (!req) {
   return callback("Unable to connect to IndexedDB");
  }
  req.onupgradeneeded = e => {
   var db = e.target.result;
   var transaction = e.target.transaction;
   var fileStore;
   if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
    fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
   } else {
    fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
   }
   if (!fileStore.indexNames.contains("timestamp")) {
    fileStore.createIndex("timestamp", "timestamp", {
     unique: false
    });
   }
  };
  req.onsuccess = () => {
   db = req.result;
   IDBFS.dbs[name] = db;
   callback(null, db);
  };
  req.onerror = e => {
   callback(this.error);
   e.preventDefault();
  };
 },
 getLocalSet: (mount, callback) => {
  var entries = {};
  function isRealDir(p) {
   return p !== "." && p !== "..";
  }
  function toAbsolute(root) {
   return p => {
    return PATH.join2(root, p);
   };
  }
  var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  while (check.length) {
   var path = check.pop();
   var stat;
   try {
    stat = FS.stat(path);
   } catch (e) {
    return callback(e);
   }
   if (FS.isDir(stat.mode)) {
    check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
   }
   entries[path] = {
    "timestamp": stat.mtime
   };
  }
  return callback(null, {
   type: "local",
   entries: entries
  });
 },
 getRemoteSet: (mount, callback) => {
  var entries = {};
  IDBFS.getDB(mount.mountpoint, (err, db) => {
   if (err) return callback(err);
   try {
    var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readonly");
    transaction.onerror = e => {
     callback(this.error);
     e.preventDefault();
    };
    var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
    var index = store.index("timestamp");
    index.openKeyCursor().onsuccess = event => {
     var cursor = event.target.result;
     if (!cursor) {
      return callback(null, {
       type: "remote",
       db: db,
       entries: entries
      });
     }
     entries[cursor.primaryKey] = {
      "timestamp": cursor.key
     };
     cursor.continue();
    };
   } catch (e) {
    return callback(e);
   }
  });
 },
 loadLocalEntry: (path, callback) => {
  var stat, node;
  try {
   var lookup = FS.lookupPath(path);
   node = lookup.node;
   stat = FS.stat(path);
  } catch (e) {
   return callback(e);
  }
  if (FS.isDir(stat.mode)) {
   return callback(null, {
    "timestamp": stat.mtime,
    "mode": stat.mode
   });
  } else if (FS.isFile(stat.mode)) {
   node.contents = MEMFS.getFileDataAsTypedArray(node);
   return callback(null, {
    "timestamp": stat.mtime,
    "mode": stat.mode,
    "contents": node.contents
   });
  } else {
   return callback(new Error("node type not supported"));
  }
 },
 storeLocalEntry: (path, entry, callback) => {
  try {
   if (FS.isDir(entry["mode"])) {
    FS.mkdirTree(path, entry["mode"]);
   } else if (FS.isFile(entry["mode"])) {
    FS.writeFile(path, entry["contents"], {
     canOwn: true
    });
   } else {
    return callback(new Error("node type not supported"));
   }
   FS.chmod(path, entry["mode"]);
   FS.utime(path, entry["timestamp"], entry["timestamp"]);
  } catch (e) {
   return callback(e);
  }
  callback(null);
 },
 removeLocalEntry: (path, callback) => {
  try {
   var stat = FS.stat(path);
   if (FS.isDir(stat.mode)) {
    FS.rmdir(path);
   } else if (FS.isFile(stat.mode)) {
    FS.unlink(path);
   }
  } catch (e) {
   return callback(e);
  }
  callback(null);
 },
 loadRemoteEntry: (store, path, callback) => {
  var req = store.get(path);
  req.onsuccess = event => {
   callback(null, event.target.result);
  };
  req.onerror = e => {
   callback(this.error);
   e.preventDefault();
  };
 },
 storeRemoteEntry: (store, path, entry, callback) => {
  try {
   var req = store.put(entry, path);
  } catch (e) {
   callback(e);
   return;
  }
  req.onsuccess = () => {
   callback(null);
  };
  req.onerror = e => {
   callback(this.error);
   e.preventDefault();
  };
 },
 removeRemoteEntry: (store, path, callback) => {
  var req = store.delete(path);
  req.onsuccess = () => {
   callback(null);
  };
  req.onerror = e => {
   callback(this.error);
   e.preventDefault();
  };
 },
 reconcile: (src, dst, callback) => {
  var total = 0;
  var create = [];
  Object.keys(src.entries).forEach(function(key) {
   var e = src.entries[key];
   var e2 = dst.entries[key];
   if (!e2 || e["timestamp"].getTime() != e2["timestamp"].getTime()) {
    create.push(key);
    total++;
   }
  });
  var remove = [];
  Object.keys(dst.entries).forEach(function(key) {
   if (!src.entries[key]) {
    remove.push(key);
    total++;
   }
  });
  if (!total) {
   return callback(null);
  }
  var errored = false;
  var db = src.type === "remote" ? src.db : dst.db;
  var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readwrite");
  var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  function done(err) {
   if (err && !errored) {
    errored = true;
    return callback(err);
   }
  }
  transaction.onerror = e => {
   done(this.error);
   e.preventDefault();
  };
  transaction.oncomplete = e => {
   if (!errored) {
    callback(null);
   }
  };
  create.sort().forEach(path => {
   if (dst.type === "local") {
    IDBFS.loadRemoteEntry(store, path, (err, entry) => {
     if (err) return done(err);
     IDBFS.storeLocalEntry(path, entry, done);
    });
   } else {
    IDBFS.loadLocalEntry(path, (err, entry) => {
     if (err) return done(err);
     IDBFS.storeRemoteEntry(store, path, entry, done);
    });
   }
  });
  remove.sort().reverse().forEach(path => {
   if (dst.type === "local") {
    IDBFS.removeLocalEntry(path, done);
   } else {
    IDBFS.removeRemoteEntry(store, path, done);
   }
  });
 }
};

var FS = {
 root: null,
 mounts: [],
 devices: {},
 streams: [],
 nextInode: 1,
 nameTable: null,
 currentPath: "/",
 initialized: false,
 ignorePermissions: true,
 ErrnoError: null,
 genericErrors: {},
 filesystems: null,
 syncFSRequests: 0,
 lookupPath: (path, opts = {}) => {
  path = PATH_FS.resolve(path);
  if (!path) return {
   path: "",
   node: null
  };
  var defaults = {
   follow_mount: true,
   recurse_count: 0
  };
  opts = Object.assign(defaults, opts);
  if (opts.recurse_count > 8) {
   throw new FS.ErrnoError(32);
  }
  var parts = path.split("/").filter(p => !!p);
  var current = FS.root;
  var current_path = "/";
  for (var i = 0; i < parts.length; i++) {
   var islast = i === parts.length - 1;
   if (islast && opts.parent) {
    break;
   }
   current = FS.lookupNode(current, parts[i]);
   current_path = PATH.join2(current_path, parts[i]);
   if (FS.isMountpoint(current)) {
    if (!islast || islast && opts.follow_mount) {
     current = current.mounted.root;
    }
   }
   if (!islast || opts.follow) {
    var count = 0;
    while (FS.isLink(current.mode)) {
     var link = FS.readlink(current_path);
     current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
     var lookup = FS.lookupPath(current_path, {
      recurse_count: opts.recurse_count + 1
     });
     current = lookup.node;
     if (count++ > 40) {
      throw new FS.ErrnoError(32);
     }
    }
   }
  }
  return {
   path: current_path,
   node: current
  };
 },
 getPath: node => {
  var path;
  while (true) {
   if (FS.isRoot(node)) {
    var mount = node.mount.mountpoint;
    if (!path) return mount;
    return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
   }
   path = path ? `${node.name}/${path}` : node.name;
   node = node.parent;
  }
 },
 hashName: (parentid, name) => {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
   hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
  }
  return (parentid + hash >>> 0) % FS.nameTable.length;
 },
 hashAddNode: node => {
  var hash = FS.hashName(node.parent.id, node.name);
  node.name_next = FS.nameTable[hash];
  FS.nameTable[hash] = node;
 },
 hashRemoveNode: node => {
  var hash = FS.hashName(node.parent.id, node.name);
  if (FS.nameTable[hash] === node) {
   FS.nameTable[hash] = node.name_next;
  } else {
   var current = FS.nameTable[hash];
   while (current) {
    if (current.name_next === node) {
     current.name_next = node.name_next;
     break;
    }
    current = current.name_next;
   }
  }
 },
 lookupNode: (parent, name) => {
  var errCode = FS.mayLookup(parent);
  if (errCode) {
   throw new FS.ErrnoError(errCode, parent);
  }
  var hash = FS.hashName(parent.id, name);
  for (var node = FS.nameTable[hash]; node; node = node.name_next) {
   var nodeName = node.name;
   if (node.parent.id === parent.id && nodeName === name) {
    return node;
   }
  }
  return FS.lookup(parent, name);
 },
 createNode: (parent, name, mode, rdev) => {
  var node = new FS.FSNode(parent, name, mode, rdev);
  FS.hashAddNode(node);
  return node;
 },
 destroyNode: node => {
  FS.hashRemoveNode(node);
 },
 isRoot: node => {
  return node === node.parent;
 },
 isMountpoint: node => {
  return !!node.mounted;
 },
 isFile: mode => {
  return (mode & 61440) === 32768;
 },
 isDir: mode => {
  return (mode & 61440) === 16384;
 },
 isLink: mode => {
  return (mode & 61440) === 40960;
 },
 isChrdev: mode => {
  return (mode & 61440) === 8192;
 },
 isBlkdev: mode => {
  return (mode & 61440) === 24576;
 },
 isFIFO: mode => {
  return (mode & 61440) === 4096;
 },
 isSocket: mode => {
  return (mode & 49152) === 49152;
 },
 flagsToPermissionString: flag => {
  var perms = [ "r", "w", "rw" ][flag & 3];
  if (flag & 512) {
   perms += "w";
  }
  return perms;
 },
 nodePermissions: (node, perms) => {
  if (FS.ignorePermissions) {
   return 0;
  }
  if (perms.includes("r") && !(node.mode & 292)) {
   return 2;
  } else if (perms.includes("w") && !(node.mode & 146)) {
   return 2;
  } else if (perms.includes("x") && !(node.mode & 73)) {
   return 2;
  }
  return 0;
 },
 mayLookup: dir => {
  var errCode = FS.nodePermissions(dir, "x");
  if (errCode) return errCode;
  if (!dir.node_ops.lookup) return 2;
  return 0;
 },
 mayCreate: (dir, name) => {
  try {
   var node = FS.lookupNode(dir, name);
   return 20;
  } catch (e) {}
  return FS.nodePermissions(dir, "wx");
 },
 mayDelete: (dir, name, isdir) => {
  var node;
  try {
   node = FS.lookupNode(dir, name);
  } catch (e) {
   return e.errno;
  }
  var errCode = FS.nodePermissions(dir, "wx");
  if (errCode) {
   return errCode;
  }
  if (isdir) {
   if (!FS.isDir(node.mode)) {
    return 54;
   }
   if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
    return 10;
   }
  } else {
   if (FS.isDir(node.mode)) {
    return 31;
   }
  }
  return 0;
 },
 mayOpen: (node, flags) => {
  if (!node) {
   return 44;
  }
  if (FS.isLink(node.mode)) {
   return 32;
  } else if (FS.isDir(node.mode)) {
   if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
    return 31;
   }
  }
  return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
 },
 MAX_OPEN_FDS: 4096,
 nextfd: () => {
  for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
   if (!FS.streams[fd]) {
    return fd;
   }
  }
  throw new FS.ErrnoError(33);
 },
 getStreamChecked: fd => {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  return stream;
 },
 getStream: fd => FS.streams[fd],
 createStream: (stream, fd = -1) => {
  if (!FS.FSStream) {
   FS.FSStream = function() {
    this.shared = {};
   };
   FS.FSStream.prototype = {};
   Object.defineProperties(FS.FSStream.prototype, {
    object: {
     get: function() {
      return this.node;
     },
     set: function(val) {
      this.node = val;
     }
    },
    isRead: {
     get: function() {
      return (this.flags & 2097155) !== 1;
     }
    },
    isWrite: {
     get: function() {
      return (this.flags & 2097155) !== 0;
     }
    },
    isAppend: {
     get: function() {
      return this.flags & 1024;
     }
    },
    flags: {
     get: function() {
      return this.shared.flags;
     },
     set: function(val) {
      this.shared.flags = val;
     }
    },
    position: {
     get: function() {
      return this.shared.position;
     },
     set: function(val) {
      this.shared.position = val;
     }
    }
   });
  }
  stream = Object.assign(new FS.FSStream(), stream);
  if (fd == -1) {
   fd = FS.nextfd();
  }
  stream.fd = fd;
  FS.streams[fd] = stream;
  return stream;
 },
 closeStream: fd => {
  FS.streams[fd] = null;
 },
 chrdev_stream_ops: {
  open: stream => {
   var device = FS.getDevice(stream.node.rdev);
   stream.stream_ops = device.stream_ops;
   if (stream.stream_ops.open) {
    stream.stream_ops.open(stream);
   }
  },
  llseek: () => {
   throw new FS.ErrnoError(70);
  }
 },
 major: dev => dev >> 8,
 minor: dev => dev & 255,
 makedev: (ma, mi) => ma << 8 | mi,
 registerDevice: (dev, ops) => {
  FS.devices[dev] = {
   stream_ops: ops
  };
 },
 getDevice: dev => FS.devices[dev],
 getMounts: mount => {
  var mounts = [];
  var check = [ mount ];
  while (check.length) {
   var m = check.pop();
   mounts.push(m);
   check.push.apply(check, m.mounts);
  }
  return mounts;
 },
 syncfs: (populate, callback) => {
  if (typeof populate == "function") {
   callback = populate;
   populate = false;
  }
  FS.syncFSRequests++;
  if (FS.syncFSRequests > 1) {
   err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
  }
  var mounts = FS.getMounts(FS.root.mount);
  var completed = 0;
  function doCallback(errCode) {
   FS.syncFSRequests--;
   return callback(errCode);
  }
  function done(errCode) {
   if (errCode) {
    if (!done.errored) {
     done.errored = true;
     return doCallback(errCode);
    }
    return;
   }
   if (++completed >= mounts.length) {
    doCallback(null);
   }
  }
  mounts.forEach(mount => {
   if (!mount.type.syncfs) {
    return done(null);
   }
   mount.type.syncfs(mount, populate, done);
  });
 },
 mount: (type, opts, mountpoint) => {
  var root = mountpoint === "/";
  var pseudo = !mountpoint;
  var node;
  if (root && FS.root) {
   throw new FS.ErrnoError(10);
  } else if (!root && !pseudo) {
   var lookup = FS.lookupPath(mountpoint, {
    follow_mount: false
   });
   mountpoint = lookup.path;
   node = lookup.node;
   if (FS.isMountpoint(node)) {
    throw new FS.ErrnoError(10);
   }
   if (!FS.isDir(node.mode)) {
    throw new FS.ErrnoError(54);
   }
  }
  var mount = {
   type: type,
   opts: opts,
   mountpoint: mountpoint,
   mounts: []
  };
  var mountRoot = type.mount(mount);
  mountRoot.mount = mount;
  mount.root = mountRoot;
  if (root) {
   FS.root = mountRoot;
  } else if (node) {
   node.mounted = mount;
   if (node.mount) {
    node.mount.mounts.push(mount);
   }
  }
  return mountRoot;
 },
 unmount: mountpoint => {
  var lookup = FS.lookupPath(mountpoint, {
   follow_mount: false
  });
  if (!FS.isMountpoint(lookup.node)) {
   throw new FS.ErrnoError(28);
  }
  var node = lookup.node;
  var mount = node.mounted;
  var mounts = FS.getMounts(mount);
  Object.keys(FS.nameTable).forEach(hash => {
   var current = FS.nameTable[hash];
   while (current) {
    var next = current.name_next;
    if (mounts.includes(current.mount)) {
     FS.destroyNode(current);
    }
    current = next;
   }
  });
  node.mounted = null;
  var idx = node.mount.mounts.indexOf(mount);
  node.mount.mounts.splice(idx, 1);
 },
 lookup: (parent, name) => {
  return parent.node_ops.lookup(parent, name);
 },
 mknod: (path, mode, dev) => {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  if (!name || name === "." || name === "..") {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.mayCreate(parent, name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.mknod) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.mknod(parent, name, mode, dev);
 },
 create: (path, mode) => {
  mode = mode !== undefined ? mode : 438;
  mode &= 4095;
  mode |= 32768;
  return FS.mknod(path, mode, 0);
 },
 mkdir: (path, mode) => {
  mode = mode !== undefined ? mode : 511;
  mode &= 511 | 512;
  mode |= 16384;
  return FS.mknod(path, mode, 0);
 },
 mkdirTree: (path, mode) => {
  var dirs = path.split("/");
  var d = "";
  for (var i = 0; i < dirs.length; ++i) {
   if (!dirs[i]) continue;
   d += "/" + dirs[i];
   try {
    FS.mkdir(d, mode);
   } catch (e) {
    if (e.errno != 20) throw e;
   }
  }
 },
 mkdev: (path, mode, dev) => {
  if (typeof dev == "undefined") {
   dev = mode;
   mode = 438;
  }
  mode |= 8192;
  return FS.mknod(path, mode, dev);
 },
 symlink: (oldpath, newpath) => {
  if (!PATH_FS.resolve(oldpath)) {
   throw new FS.ErrnoError(44);
  }
  var lookup = FS.lookupPath(newpath, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var newname = PATH.basename(newpath);
  var errCode = FS.mayCreate(parent, newname);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.symlink) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.symlink(parent, newname, oldpath);
 },
 rename: (old_path, new_path) => {
  var old_dirname = PATH.dirname(old_path);
  var new_dirname = PATH.dirname(new_path);
  var old_name = PATH.basename(old_path);
  var new_name = PATH.basename(new_path);
  var lookup, old_dir, new_dir;
  lookup = FS.lookupPath(old_path, {
   parent: true
  });
  old_dir = lookup.node;
  lookup = FS.lookupPath(new_path, {
   parent: true
  });
  new_dir = lookup.node;
  if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
  if (old_dir.mount !== new_dir.mount) {
   throw new FS.ErrnoError(75);
  }
  var old_node = FS.lookupNode(old_dir, old_name);
  var relative = PATH_FS.relative(old_path, new_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(28);
  }
  relative = PATH_FS.relative(new_path, old_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(55);
  }
  var new_node;
  try {
   new_node = FS.lookupNode(new_dir, new_name);
  } catch (e) {}
  if (old_node === new_node) {
   return;
  }
  var isdir = FS.isDir(old_node.mode);
  var errCode = FS.mayDelete(old_dir, old_name, isdir);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!old_dir.node_ops.rename) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
   throw new FS.ErrnoError(10);
  }
  if (new_dir !== old_dir) {
   errCode = FS.nodePermissions(old_dir, "w");
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  FS.hashRemoveNode(old_node);
  try {
   old_dir.node_ops.rename(old_node, new_dir, new_name);
  } catch (e) {
   throw e;
  } finally {
   FS.hashAddNode(old_node);
  }
 },
 rmdir: path => {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, true);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.rmdir) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  parent.node_ops.rmdir(parent, name);
  FS.destroyNode(node);
 },
 readdir: path => {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node.node_ops.readdir) {
   throw new FS.ErrnoError(54);
  }
  return node.node_ops.readdir(node);
 },
 unlink: path => {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, false);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.unlink) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  parent.node_ops.unlink(parent, name);
  FS.destroyNode(node);
 },
 readlink: path => {
  var lookup = FS.lookupPath(path);
  var link = lookup.node;
  if (!link) {
   throw new FS.ErrnoError(44);
  }
  if (!link.node_ops.readlink) {
   throw new FS.ErrnoError(28);
  }
  return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
 },
 stat: (path, dontFollow) => {
  var lookup = FS.lookupPath(path, {
   follow: !dontFollow
  });
  var node = lookup.node;
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (!node.node_ops.getattr) {
   throw new FS.ErrnoError(63);
  }
  return node.node_ops.getattr(node);
 },
 lstat: path => {
  return FS.stat(path, true);
 },
 chmod: (path, mode, dontFollow) => {
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   mode: mode & 4095 | node.mode & ~4095,
   timestamp: Date.now()
  });
 },
 lchmod: (path, mode) => {
  FS.chmod(path, mode, true);
 },
 fchmod: (fd, mode) => {
  var stream = FS.getStreamChecked(fd);
  FS.chmod(stream.node, mode);
 },
 chown: (path, uid, gid, dontFollow) => {
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   timestamp: Date.now()
  });
 },
 lchown: (path, uid, gid) => {
  FS.chown(path, uid, gid, true);
 },
 fchown: (fd, uid, gid) => {
  var stream = FS.getStreamChecked(fd);
  FS.chown(stream.node, uid, gid);
 },
 truncate: (path, len) => {
  if (len < 0) {
   throw new FS.ErrnoError(28);
  }
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: true
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isDir(node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!FS.isFile(node.mode)) {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.nodePermissions(node, "w");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  node.node_ops.setattr(node, {
   size: len,
   timestamp: Date.now()
  });
 },
 ftruncate: (fd, len) => {
  var stream = FS.getStreamChecked(fd);
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(28);
  }
  FS.truncate(stream.node, len);
 },
 utime: (path, atime, mtime) => {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  node.node_ops.setattr(node, {
   timestamp: Math.max(atime, mtime)
  });
 },
 open: (path, flags, mode) => {
  if (path === "") {
   throw new FS.ErrnoError(44);
  }
  flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
  mode = typeof mode == "undefined" ? 438 : mode;
  if (flags & 64) {
   mode = mode & 4095 | 32768;
  } else {
   mode = 0;
  }
  var node;
  if (typeof path == "object") {
   node = path;
  } else {
   path = PATH.normalize(path);
   try {
    var lookup = FS.lookupPath(path, {
     follow: !(flags & 131072)
    });
    node = lookup.node;
   } catch (e) {}
  }
  var created = false;
  if (flags & 64) {
   if (node) {
    if (flags & 128) {
     throw new FS.ErrnoError(20);
    }
   } else {
    node = FS.mknod(path, mode, 0);
    created = true;
   }
  }
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (FS.isChrdev(node.mode)) {
   flags &= ~512;
  }
  if (flags & 65536 && !FS.isDir(node.mode)) {
   throw new FS.ErrnoError(54);
  }
  if (!created) {
   var errCode = FS.mayOpen(node, flags);
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  if (flags & 512 && !created) {
   FS.truncate(node, 0);
  }
  flags &= ~(128 | 512 | 131072);
  var stream = FS.createStream({
   node: node,
   path: FS.getPath(node),
   flags: flags,
   seekable: true,
   position: 0,
   stream_ops: node.stream_ops,
   ungotten: [],
   error: false
  });
  if (stream.stream_ops.open) {
   stream.stream_ops.open(stream);
  }
  if (Module["logReadFiles"] && !(flags & 1)) {
   if (!FS.readFiles) FS.readFiles = {};
   if (!(path in FS.readFiles)) {
    FS.readFiles[path] = 1;
   }
  }
  return stream;
 },
 close: stream => {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (stream.getdents) stream.getdents = null;
  try {
   if (stream.stream_ops.close) {
    stream.stream_ops.close(stream);
   }
  } catch (e) {
   throw e;
  } finally {
   FS.closeStream(stream.fd);
  }
  stream.fd = null;
 },
 isClosed: stream => {
  return stream.fd === null;
 },
 llseek: (stream, offset, whence) => {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (!stream.seekable || !stream.stream_ops.llseek) {
   throw new FS.ErrnoError(70);
  }
  if (whence != 0 && whence != 1 && whence != 2) {
   throw new FS.ErrnoError(28);
  }
  stream.position = stream.stream_ops.llseek(stream, offset, whence);
  stream.ungotten = [];
  return stream.position;
 },
 read: (stream, buffer, offset, length, position) => {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.read) {
   throw new FS.ErrnoError(28);
  }
  var seeking = typeof position != "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
  if (!seeking) stream.position += bytesRead;
  return bytesRead;
 },
 write: (stream, buffer, offset, length, position, canOwn) => {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.write) {
   throw new FS.ErrnoError(28);
  }
  if (stream.seekable && stream.flags & 1024) {
   FS.llseek(stream, 0, 2);
  }
  var seeking = typeof position != "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
  if (!seeking) stream.position += bytesWritten;
  return bytesWritten;
 },
 allocate: (stream, offset, length) => {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (offset < 0 || length <= 0) {
   throw new FS.ErrnoError(28);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (!stream.stream_ops.allocate) {
   throw new FS.ErrnoError(138);
  }
  stream.stream_ops.allocate(stream, offset, length);
 },
 mmap: (stream, length, position, prot, flags) => {
  if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
   throw new FS.ErrnoError(2);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(2);
  }
  if (!stream.stream_ops.mmap) {
   throw new FS.ErrnoError(43);
  }
  return stream.stream_ops.mmap(stream, length, position, prot, flags);
 },
 msync: (stream, buffer, offset, length, mmapFlags) => {
  if (!stream.stream_ops.msync) {
   return 0;
  }
  return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
 },
 munmap: stream => 0,
 ioctl: (stream, cmd, arg) => {
  if (!stream.stream_ops.ioctl) {
   throw new FS.ErrnoError(59);
  }
  return stream.stream_ops.ioctl(stream, cmd, arg);
 },
 readFile: (path, opts = {}) => {
  opts.flags = opts.flags || 0;
  opts.encoding = opts.encoding || "binary";
  if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
   throw new Error(`Invalid encoding type "${opts.encoding}"`);
  }
  var ret;
  var stream = FS.open(path, opts.flags);
  var stat = FS.stat(path);
  var length = stat.size;
  var buf = new Uint8Array(length);
  FS.read(stream, buf, 0, length, 0);
  if (opts.encoding === "utf8") {
   ret = UTF8ArrayToString(buf, 0);
  } else if (opts.encoding === "binary") {
   ret = buf;
  }
  FS.close(stream);
  return ret;
 },
 writeFile: (path, data, opts = {}) => {
  opts.flags = opts.flags || 577;
  var stream = FS.open(path, opts.flags, opts.mode);
  if (typeof data == "string") {
   var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
   var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
   FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
  } else if (ArrayBuffer.isView(data)) {
   FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
  } else {
   throw new Error("Unsupported data type");
  }
  FS.close(stream);
 },
 cwd: () => FS.currentPath,
 chdir: path => {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  if (lookup.node === null) {
   throw new FS.ErrnoError(44);
  }
  if (!FS.isDir(lookup.node.mode)) {
   throw new FS.ErrnoError(54);
  }
  var errCode = FS.nodePermissions(lookup.node, "x");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  FS.currentPath = lookup.path;
 },
 createDefaultDirectories: () => {
  FS.mkdir("/tmp");
  FS.mkdir("/home");
  FS.mkdir("/home/web_user");
 },
 createDefaultDevices: () => {
  FS.mkdir("/dev");
  FS.registerDevice(FS.makedev(1, 3), {
   read: () => 0,
   write: (stream, buffer, offset, length, pos) => length
  });
  FS.mkdev("/dev/null", FS.makedev(1, 3));
  TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
  TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
  FS.mkdev("/dev/tty", FS.makedev(5, 0));
  FS.mkdev("/dev/tty1", FS.makedev(6, 0));
  var randomBuffer = new Uint8Array(1024), randomLeft = 0;
  var randomByte = () => {
   if (randomLeft === 0) {
    randomLeft = randomFill(randomBuffer).byteLength;
   }
   return randomBuffer[--randomLeft];
  };
  FS.createDevice("/dev", "random", randomByte);
  FS.createDevice("/dev", "urandom", randomByte);
  FS.mkdir("/dev/shm");
  FS.mkdir("/dev/shm/tmp");
 },
 createSpecialDirectories: () => {
  FS.mkdir("/proc");
  var proc_self = FS.mkdir("/proc/self");
  FS.mkdir("/proc/self/fd");
  FS.mount({
   mount: () => {
    var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
    node.node_ops = {
     lookup: (parent, name) => {
      var fd = +name;
      var stream = FS.getStreamChecked(fd);
      var ret = {
       parent: null,
       mount: {
        mountpoint: "fake"
       },
       node_ops: {
        readlink: () => stream.path
       }
      };
      ret.parent = ret;
      return ret;
     }
    };
    return node;
   }
  }, {}, "/proc/self/fd");
 },
 createStandardStreams: () => {
  if (Module["stdin"]) {
   FS.createDevice("/dev", "stdin", Module["stdin"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdin");
  }
  if (Module["stdout"]) {
   FS.createDevice("/dev", "stdout", null, Module["stdout"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdout");
  }
  if (Module["stderr"]) {
   FS.createDevice("/dev", "stderr", null, Module["stderr"]);
  } else {
   FS.symlink("/dev/tty1", "/dev/stderr");
  }
  var stdin = FS.open("/dev/stdin", 0);
  var stdout = FS.open("/dev/stdout", 1);
  var stderr = FS.open("/dev/stderr", 1);
 },
 ensureErrnoError: () => {
  if (FS.ErrnoError) return;
  FS.ErrnoError = function ErrnoError(errno, node) {
   this.name = "ErrnoError";
   this.node = node;
   this.setErrno = function(errno) {
    this.errno = errno;
   };
   this.setErrno(errno);
   this.message = "FS error";
  };
  FS.ErrnoError.prototype = new Error();
  FS.ErrnoError.prototype.constructor = FS.ErrnoError;
  [ 44 ].forEach(code => {
   FS.genericErrors[code] = new FS.ErrnoError(code);
   FS.genericErrors[code].stack = "<generic error, no stack>";
  });
 },
 staticInit: () => {
  FS.ensureErrnoError();
  FS.nameTable = new Array(4096);
  FS.mount(MEMFS, {}, "/");
  FS.createDefaultDirectories();
  FS.createDefaultDevices();
  FS.createSpecialDirectories();
  FS.filesystems = {
   "MEMFS": MEMFS,
   "IDBFS": IDBFS
  };
 },
 init: (input, output, error) => {
  FS.init.initialized = true;
  FS.ensureErrnoError();
  Module["stdin"] = input || Module["stdin"];
  Module["stdout"] = output || Module["stdout"];
  Module["stderr"] = error || Module["stderr"];
  FS.createStandardStreams();
 },
 quit: () => {
  FS.init.initialized = false;
  for (var i = 0; i < FS.streams.length; i++) {
   var stream = FS.streams[i];
   if (!stream) {
    continue;
   }
   FS.close(stream);
  }
 },
 findObject: (path, dontResolveLastLink) => {
  var ret = FS.analyzePath(path, dontResolveLastLink);
  if (!ret.exists) {
   return null;
  }
  return ret.object;
 },
 analyzePath: (path, dontResolveLastLink) => {
  try {
   var lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   path = lookup.path;
  } catch (e) {}
  var ret = {
   isRoot: false,
   exists: false,
   error: 0,
   name: null,
   path: null,
   object: null,
   parentExists: false,
   parentPath: null,
   parentObject: null
  };
  try {
   var lookup = FS.lookupPath(path, {
    parent: true
   });
   ret.parentExists = true;
   ret.parentPath = lookup.path;
   ret.parentObject = lookup.node;
   ret.name = PATH.basename(path);
   lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   ret.exists = true;
   ret.path = lookup.path;
   ret.object = lookup.node;
   ret.name = lookup.node.name;
   ret.isRoot = lookup.path === "/";
  } catch (e) {
   ret.error = e.errno;
  }
  return ret;
 },
 createPath: (parent, path, canRead, canWrite) => {
  parent = typeof parent == "string" ? parent : FS.getPath(parent);
  var parts = path.split("/").reverse();
  while (parts.length) {
   var part = parts.pop();
   if (!part) continue;
   var current = PATH.join2(parent, part);
   try {
    FS.mkdir(current);
   } catch (e) {}
   parent = current;
  }
  return current;
 },
 createFile: (parent, name, properties, canRead, canWrite) => {
  var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
  var mode = FS_getMode(canRead, canWrite);
  return FS.create(path, mode);
 },
 createDataFile: (parent, name, data, canRead, canWrite, canOwn) => {
  var path = name;
  if (parent) {
   parent = typeof parent == "string" ? parent : FS.getPath(parent);
   path = name ? PATH.join2(parent, name) : parent;
  }
  var mode = FS_getMode(canRead, canWrite);
  var node = FS.create(path, mode);
  if (data) {
   if (typeof data == "string") {
    var arr = new Array(data.length);
    for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
    data = arr;
   }
   FS.chmod(node, mode | 146);
   var stream = FS.open(node, 577);
   FS.write(stream, data, 0, data.length, 0, canOwn);
   FS.close(stream);
   FS.chmod(node, mode);
  }
  return node;
 },
 createDevice: (parent, name, input, output) => {
  var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
  var mode = FS_getMode(!!input, !!output);
  if (!FS.createDevice.major) FS.createDevice.major = 64;
  var dev = FS.makedev(FS.createDevice.major++, 0);
  FS.registerDevice(dev, {
   open: stream => {
    stream.seekable = false;
   },
   close: stream => {
    if (output && output.buffer && output.buffer.length) {
     output(10);
    }
   },
   read: (stream, buffer, offset, length, pos) => {
    var bytesRead = 0;
    for (var i = 0; i < length; i++) {
     var result;
     try {
      result = input();
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
     if (result === undefined && bytesRead === 0) {
      throw new FS.ErrnoError(6);
     }
     if (result === null || result === undefined) break;
     bytesRead++;
     buffer[offset + i] = result;
    }
    if (bytesRead) {
     stream.node.timestamp = Date.now();
    }
    return bytesRead;
   },
   write: (stream, buffer, offset, length, pos) => {
    for (var i = 0; i < length; i++) {
     try {
      output(buffer[offset + i]);
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
    }
    if (length) {
     stream.node.timestamp = Date.now();
    }
    return i;
   }
  });
  return FS.mkdev(path, mode, dev);
 },
 forceLoadFile: obj => {
  if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
  if (typeof XMLHttpRequest != "undefined") {
   throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  } else if (read_) {
   try {
    obj.contents = intArrayFromString(read_(obj.url), true);
    obj.usedBytes = obj.contents.length;
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
  } else {
   throw new Error("Cannot load without read() or XMLHttpRequest.");
  }
 },
 createLazyFile: (parent, name, url, canRead, canWrite) => {
  function LazyUint8Array() {
   this.lengthKnown = false;
   this.chunks = [];
  }
  LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
   if (idx > this.length - 1 || idx < 0) {
    return undefined;
   }
   var chunkOffset = idx % this.chunkSize;
   var chunkNum = idx / this.chunkSize | 0;
   return this.getter(chunkNum)[chunkOffset];
  };
  LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
   this.getter = getter;
  };
  LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
   var xhr = new XMLHttpRequest();
   xhr.open("HEAD", url, false);
   xhr.send(null);
   if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
   var datalength = Number(xhr.getResponseHeader("Content-length"));
   var header;
   var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
   var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
   var chunkSize = 1024 * 1024;
   if (!hasByteServing) chunkSize = datalength;
   var doXHR = (from, to) => {
    if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
    if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
    xhr.responseType = "arraybuffer";
    if (xhr.overrideMimeType) {
     xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
    xhr.send(null);
    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
    if (xhr.response !== undefined) {
     return new Uint8Array(xhr.response || []);
    }
    return intArrayFromString(xhr.responseText || "", true);
   };
   var lazyArray = this;
   lazyArray.setDataGetter(chunkNum => {
    var start = chunkNum * chunkSize;
    var end = (chunkNum + 1) * chunkSize - 1;
    end = Math.min(end, datalength - 1);
    if (typeof lazyArray.chunks[chunkNum] == "undefined") {
     lazyArray.chunks[chunkNum] = doXHR(start, end);
    }
    if (typeof lazyArray.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
    return lazyArray.chunks[chunkNum];
   });
   if (usesGzip || !datalength) {
    chunkSize = datalength = 1;
    datalength = this.getter(0).length;
    chunkSize = datalength;
    out("LazyFiles on gzip forces download of the whole file when length is accessed");
   }
   this._length = datalength;
   this._chunkSize = chunkSize;
   this.lengthKnown = true;
  };
  if (typeof XMLHttpRequest != "undefined") {
   if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
   var lazyArray = new LazyUint8Array();
   Object.defineProperties(lazyArray, {
    length: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._length;
     }
    },
    chunkSize: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._chunkSize;
     }
    }
   });
   var properties = {
    isDevice: false,
    contents: lazyArray
   };
  } else {
   var properties = {
    isDevice: false,
    url: url
   };
  }
  var node = FS.createFile(parent, name, properties, canRead, canWrite);
  if (properties.contents) {
   node.contents = properties.contents;
  } else if (properties.url) {
   node.contents = null;
   node.url = properties.url;
  }
  Object.defineProperties(node, {
   usedBytes: {
    get: function() {
     return this.contents.length;
    }
   }
  });
  var stream_ops = {};
  var keys = Object.keys(node.stream_ops);
  keys.forEach(key => {
   var fn = node.stream_ops[key];
   stream_ops[key] = function forceLoadLazyFile() {
    FS.forceLoadFile(node);
    return fn.apply(null, arguments);
   };
  });
  function writeChunks(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= contents.length) return 0;
   var size = Math.min(contents.length - position, length);
   if (contents.slice) {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents[position + i];
    }
   } else {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents.get(position + i);
    }
   }
   return size;
  }
  stream_ops.read = (stream, buffer, offset, length, position) => {
   FS.forceLoadFile(node);
   return writeChunks(stream, buffer, offset, length, position);
  };
  stream_ops.mmap = (stream, length, position, prot, flags) => {
   FS.forceLoadFile(node);
   var ptr = mmapAlloc(length);
   if (!ptr) {
    throw new FS.ErrnoError(48);
   }
   writeChunks(stream, HEAP8, ptr, length, position);
   return {
    ptr: ptr,
    allocated: true
   };
  };
  node.stream_ops = stream_ops;
  return node;
 }
};

var UTF8ToString = (ptr, maxBytesToRead) => {
 return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
};

var SYSCALLS = {
 DEFAULT_POLLMASK: 5,
 calculateAt: function(dirfd, path, allowEmpty) {
  if (PATH.isAbs(path)) {
   return path;
  }
  var dir;
  if (dirfd === -100) {
   dir = FS.cwd();
  } else {
   var dirstream = SYSCALLS.getStreamFromFD(dirfd);
   dir = dirstream.path;
  }
  if (path.length == 0) {
   if (!allowEmpty) {
    throw new FS.ErrnoError(44);
   }
   return dir;
  }
  return PATH.join2(dir, path);
 },
 doStat: function(func, path, buf) {
  try {
   var stat = func(path);
  } catch (e) {
   if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
    return -54;
   }
   throw e;
  }
  HEAP32[buf >> 2] = stat.dev;
  HEAP32[buf + 4 >> 2] = stat.mode;
  HEAPU32[buf + 8 >> 2] = stat.nlink;
  HEAP32[buf + 12 >> 2] = stat.uid;
  HEAP32[buf + 16 >> 2] = stat.gid;
  HEAP32[buf + 20 >> 2] = stat.rdev;
  tempI64 = [ stat.size >>> 0, (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 24 >> 2] = tempI64[0], HEAP32[buf + 28 >> 2] = tempI64[1];
  HEAP32[buf + 32 >> 2] = 4096;
  HEAP32[buf + 36 >> 2] = stat.blocks;
  var atime = stat.atime.getTime();
  var mtime = stat.mtime.getTime();
  var ctime = stat.ctime.getTime();
  tempI64 = [ Math.floor(atime / 1e3) >>> 0, (tempDouble = Math.floor(atime / 1e3), 
  +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
  HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3;
  tempI64 = [ Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3), 
  +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 56 >> 2] = tempI64[0], HEAP32[buf + 60 >> 2] = tempI64[1];
  HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3;
  tempI64 = [ Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3), 
  +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 72 >> 2] = tempI64[0], HEAP32[buf + 76 >> 2] = tempI64[1];
  HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3;
  tempI64 = [ stat.ino >>> 0, (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 88 >> 2] = tempI64[0], HEAP32[buf + 92 >> 2] = tempI64[1];
  return 0;
 },
 doMsync: function(addr, stream, len, flags, offset) {
  if (!FS.isFile(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (flags & 2) {
   return 0;
  }
  var buffer = HEAPU8.slice(addr, addr + len);
  FS.msync(stream, buffer, offset, len, flags);
 },
 varargs: undefined,
 get: function() {
  SYSCALLS.varargs += 4;
  var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
  return ret;
 },
 getStr: function(ptr) {
  var ret = UTF8ToString(ptr);
  return ret;
 },
 getStreamFromFD: function(fd) {
  var stream = FS.getStreamChecked(fd);
  return stream;
 }
};

var _proc_exit = code => {
 EXITSTATUS = code;
 if (!keepRuntimeAlive()) {
  if (Module["onExit"]) Module["onExit"](code);
  ABORT = true;
 }
 quit_(code, new ExitStatus(code));
};

var exitJS = (status, implicit) => {
 EXITSTATUS = status;
 _proc_exit(status);
};

var _exit = exitJS;

var maybeExit = () => {
 if (!keepRuntimeAlive()) {
  try {
   _exit(EXITSTATUS);
  } catch (e) {
   handleException(e);
  }
 }
};

var callUserCallback = func => {
 if (ABORT) {
  return;
 }
 try {
  func();
  maybeExit();
 } catch (e) {
  handleException(e);
 }
};

var safeSetTimeout = (func, timeout) => {
 return setTimeout(() => {
  callUserCallback(func);
 }, timeout);
};

var warnOnce = text => {
 if (!warnOnce.shown) warnOnce.shown = {};
 if (!warnOnce.shown[text]) {
  warnOnce.shown[text] = 1;
  if (ENVIRONMENT_IS_NODE) text = "warning: " + text;
  err(text);
 }
};

var Browser = {
 mainLoop: {
  running: false,
  scheduler: null,
  method: "",
  currentlyRunningMainloop: 0,
  func: null,
  arg: 0,
  timingMode: 0,
  timingValue: 0,
  currentFrameNumber: 0,
  queue: [],
  pause: function() {
   Browser.mainLoop.scheduler = null;
   Browser.mainLoop.currentlyRunningMainloop++;
  },
  resume: function() {
   Browser.mainLoop.currentlyRunningMainloop++;
   var timingMode = Browser.mainLoop.timingMode;
   var timingValue = Browser.mainLoop.timingValue;
   var func = Browser.mainLoop.func;
   Browser.mainLoop.func = null;
   setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
   _emscripten_set_main_loop_timing(timingMode, timingValue);
   Browser.mainLoop.scheduler();
  },
  updateStatus: function() {
   if (Module["setStatus"]) {
    var message = Module["statusMessage"] || "Please wait...";
    var remaining = Browser.mainLoop.remainingBlockers;
    var expected = Browser.mainLoop.expectedBlockers;
    if (remaining) {
     if (remaining < expected) {
      Module["setStatus"](message + " (" + (expected - remaining) + "/" + expected + ")");
     } else {
      Module["setStatus"](message);
     }
    } else {
     Module["setStatus"]("");
    }
   }
  },
  runIter: function(func) {
   if (ABORT) return;
   if (Module["preMainLoop"]) {
    var preRet = Module["preMainLoop"]();
    if (preRet === false) {
     return;
    }
   }
   callUserCallback(func);
   if (Module["postMainLoop"]) Module["postMainLoop"]();
  }
 },
 isFullscreen: false,
 pointerLock: false,
 moduleContextCreatedCallbacks: [],
 workers: [],
 init: function() {
  if (Browser.initted) return;
  Browser.initted = true;
  var imagePlugin = {};
  imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
   return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
  };
  imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
   var b = new Blob([ byteArray ], {
    type: Browser.getMimetype(name)
   });
   if (b.size !== byteArray.length) {
    b = new Blob([ new Uint8Array(byteArray).buffer ], {
     type: Browser.getMimetype(name)
    });
   }
   var url = URL.createObjectURL(b);
   var img = new Image();
   img.onload = () => {
    assert(img.complete, "Image " + name + " could not be decoded");
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    preloadedImages[name] = canvas;
    URL.revokeObjectURL(url);
    if (onload) onload(byteArray);
   };
   img.onerror = event => {
    out("Image " + url + " could not be decoded");
    if (onerror) onerror();
   };
   img.src = url;
  };
  preloadPlugins.push(imagePlugin);
  var audioPlugin = {};
  audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
   return !Module.noAudioDecoding && name.substr(-4) in {
    ".ogg": 1,
    ".wav": 1,
    ".mp3": 1
   };
  };
  audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
   var done = false;
   function finish(audio) {
    if (done) return;
    done = true;
    preloadedAudios[name] = audio;
    if (onload) onload(byteArray);
   }
   var b = new Blob([ byteArray ], {
    type: Browser.getMimetype(name)
   });
   var url = URL.createObjectURL(b);
   var audio = new Audio();
   audio.addEventListener("canplaythrough", () => finish(audio), false);
   audio.onerror = function audio_onerror(event) {
    if (done) return;
    err("warning: browser could not fully decode audio " + name + ", trying slower base64 approach");
    function encode64(data) {
     var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
     var PAD = "=";
     var ret = "";
     var leftchar = 0;
     var leftbits = 0;
     for (var i = 0; i < data.length; i++) {
      leftchar = leftchar << 8 | data[i];
      leftbits += 8;
      while (leftbits >= 6) {
       var curr = leftchar >> leftbits - 6 & 63;
       leftbits -= 6;
       ret += BASE[curr];
      }
     }
     if (leftbits == 2) {
      ret += BASE[(leftchar & 3) << 4];
      ret += PAD + PAD;
     } else if (leftbits == 4) {
      ret += BASE[(leftchar & 15) << 2];
      ret += PAD;
     }
     return ret;
    }
    audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
    finish(audio);
   };
   audio.src = url;
   safeSetTimeout(() => {
    finish(audio);
   }, 1e4);
  };
  preloadPlugins.push(audioPlugin);
  function pointerLockChange() {
   Browser.pointerLock = document["pointerLockElement"] === Module["canvas"] || document["mozPointerLockElement"] === Module["canvas"] || document["webkitPointerLockElement"] === Module["canvas"] || document["msPointerLockElement"] === Module["canvas"];
  }
  var canvas = Module["canvas"];
  if (canvas) {
   canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || (() => {});
   canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || (() => {});
   canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
   document.addEventListener("pointerlockchange", pointerLockChange, false);
   document.addEventListener("mozpointerlockchange", pointerLockChange, false);
   document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
   document.addEventListener("mspointerlockchange", pointerLockChange, false);
   if (Module["elementPointerLock"]) {
    canvas.addEventListener("click", ev => {
     if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
      Module["canvas"].requestPointerLock();
      ev.preventDefault();
     }
    }, false);
   }
  }
 },
 createContext: function(canvas, useWebGL, setInModule, webGLContextAttributes) {
  if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx;
  var ctx;
  var contextHandle;
  if (useWebGL) {
   var contextAttributes = {
    antialias: false,
    alpha: false,
    majorVersion: 1
   };
   if (webGLContextAttributes) {
    for (var attribute in webGLContextAttributes) {
     contextAttributes[attribute] = webGLContextAttributes[attribute];
    }
   }
   if (typeof GL != "undefined") {
    contextHandle = GL.createContext(canvas, contextAttributes);
    if (contextHandle) {
     ctx = GL.getContext(contextHandle).GLctx;
    }
   }
  } else {
   ctx = canvas.getContext("2d");
  }
  if (!ctx) return null;
  if (setInModule) {
   if (!useWebGL) assert(typeof GLctx == "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
   Module.ctx = ctx;
   if (useWebGL) GL.makeContextCurrent(contextHandle);
   Module.useWebGL = useWebGL;
   Browser.moduleContextCreatedCallbacks.forEach(callback => callback());
   Browser.init();
  }
  return ctx;
 },
 destroyContext: function(canvas, useWebGL, setInModule) {},
 fullscreenHandlersInstalled: false,
 lockPointer: undefined,
 resizeCanvas: undefined,
 requestFullscreen: function(lockPointer, resizeCanvas) {
  Browser.lockPointer = lockPointer;
  Browser.resizeCanvas = resizeCanvas;
  if (typeof Browser.lockPointer == "undefined") Browser.lockPointer = true;
  if (typeof Browser.resizeCanvas == "undefined") Browser.resizeCanvas = false;
  var canvas = Module["canvas"];
  function fullscreenChange() {
   Browser.isFullscreen = false;
   var canvasContainer = canvas.parentNode;
   if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
    canvas.exitFullscreen = Browser.exitFullscreen;
    if (Browser.lockPointer) canvas.requestPointerLock();
    Browser.isFullscreen = true;
    if (Browser.resizeCanvas) {
     Browser.setFullscreenCanvasSize();
    } else {
     Browser.updateCanvasDimensions(canvas);
    }
   } else {
    canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
    canvasContainer.parentNode.removeChild(canvasContainer);
    if (Browser.resizeCanvas) {
     Browser.setWindowedCanvasSize();
    } else {
     Browser.updateCanvasDimensions(canvas);
    }
   }
   if (Module["onFullScreen"]) Module["onFullScreen"](Browser.isFullscreen);
   if (Module["onFullscreen"]) Module["onFullscreen"](Browser.isFullscreen);
  }
  if (!Browser.fullscreenHandlersInstalled) {
   Browser.fullscreenHandlersInstalled = true;
   document.addEventListener("fullscreenchange", fullscreenChange, false);
   document.addEventListener("mozfullscreenchange", fullscreenChange, false);
   document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
   document.addEventListener("MSFullscreenChange", fullscreenChange, false);
  }
  var canvasContainer = document.createElement("div");
  canvas.parentNode.insertBefore(canvasContainer, canvas);
  canvasContainer.appendChild(canvas);
  canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? () => canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null) || (canvasContainer["webkitRequestFullScreen"] ? () => canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null);
  canvasContainer.requestFullscreen();
 },
 exitFullscreen: function() {
  if (!Browser.isFullscreen) {
   return false;
  }
  var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || (() => {});
  CFS.apply(document, []);
  return true;
 },
 nextRAF: 0,
 fakeRequestAnimationFrame: function(func) {
  var now = Date.now();
  if (Browser.nextRAF === 0) {
   Browser.nextRAF = now + 1e3 / 60;
  } else {
   while (now + 2 >= Browser.nextRAF) {
    Browser.nextRAF += 1e3 / 60;
   }
  }
  var delay = Math.max(Browser.nextRAF - now, 0);
  setTimeout(func, delay);
 },
 requestAnimationFrame: function(func) {
  if (typeof requestAnimationFrame == "function") {
   requestAnimationFrame(func);
   return;
  }
  var RAF = Browser.fakeRequestAnimationFrame;
  RAF(func);
 },
 safeSetTimeout: function(func, timeout) {
  return safeSetTimeout(func, timeout);
 },
 safeRequestAnimationFrame: function(func) {
  return Browser.requestAnimationFrame(() => {
   callUserCallback(func);
  });
 },
 getMimetype: function(name) {
  return {
   "jpg": "image/jpeg",
   "jpeg": "image/jpeg",
   "png": "image/png",
   "bmp": "image/bmp",
   "ogg": "audio/ogg",
   "wav": "audio/wav",
   "mp3": "audio/mpeg"
  }[name.substr(name.lastIndexOf(".") + 1)];
 },
 getUserMedia: function(func) {
  if (!window.getUserMedia) {
   window.getUserMedia = navigator["getUserMedia"] || navigator["mozGetUserMedia"];
  }
  window.getUserMedia(func);
 },
 getMovementX: function(event) {
  return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0;
 },
 getMovementY: function(event) {
  return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0;
 },
 getMouseWheelDelta: function(event) {
  var delta = 0;
  switch (event.type) {
  case "DOMMouseScroll":
   delta = event.detail / 3;
   break;

  case "mousewheel":
   delta = event.wheelDelta / 120;
   break;

  case "wheel":
   delta = event.deltaY;
   switch (event.deltaMode) {
   case 0:
    delta /= 100;
    break;

   case 1:
    delta /= 3;
    break;

   case 2:
    delta *= 80;
    break;

   default:
    throw "unrecognized mouse wheel delta mode: " + event.deltaMode;
   }
   break;

  default:
   throw "unrecognized mouse wheel event: " + event.type;
  }
  return delta;
 },
 mouseX: 0,
 mouseY: 0,
 mouseMovementX: 0,
 mouseMovementY: 0,
 touches: {},
 lastTouches: {},
 calculateMouseEvent: function(event) {
  if (Browser.pointerLock) {
   if (event.type != "mousemove" && "mozMovementX" in event) {
    Browser.mouseMovementX = Browser.mouseMovementY = 0;
   } else {
    Browser.mouseMovementX = Browser.getMovementX(event);
    Browser.mouseMovementY = Browser.getMovementY(event);
   }
   if (typeof SDL != "undefined") {
    Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
    Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
   } else {
    Browser.mouseX += Browser.mouseMovementX;
    Browser.mouseY += Browser.mouseMovementY;
   }
  } else {
   var rect = Module["canvas"].getBoundingClientRect();
   var cw = Module["canvas"].width;
   var ch = Module["canvas"].height;
   var scrollX = typeof window.scrollX != "undefined" ? window.scrollX : window.pageXOffset;
   var scrollY = typeof window.scrollY != "undefined" ? window.scrollY : window.pageYOffset;
   if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
    var touch = event.touch;
    if (touch === undefined) {
     return;
    }
    var adjustedX = touch.pageX - (scrollX + rect.left);
    var adjustedY = touch.pageY - (scrollY + rect.top);
    adjustedX = adjustedX * (cw / rect.width);
    adjustedY = adjustedY * (ch / rect.height);
    var coords = {
     x: adjustedX,
     y: adjustedY
    };
    if (event.type === "touchstart") {
     Browser.lastTouches[touch.identifier] = coords;
     Browser.touches[touch.identifier] = coords;
    } else if (event.type === "touchend" || event.type === "touchmove") {
     var last = Browser.touches[touch.identifier];
     if (!last) last = coords;
     Browser.lastTouches[touch.identifier] = last;
     Browser.touches[touch.identifier] = coords;
    }
    return;
   }
   var x = event.pageX - (scrollX + rect.left);
   var y = event.pageY - (scrollY + rect.top);
   x = x * (cw / rect.width);
   y = y * (ch / rect.height);
   Browser.mouseMovementX = x - Browser.mouseX;
   Browser.mouseMovementY = y - Browser.mouseY;
   Browser.mouseX = x;
   Browser.mouseY = y;
  }
 },
 resizeListeners: [],
 updateResizeListeners: function() {
  var canvas = Module["canvas"];
  Browser.resizeListeners.forEach(listener => listener(canvas.width, canvas.height));
 },
 setCanvasSize: function(width, height, noUpdates) {
  var canvas = Module["canvas"];
  Browser.updateCanvasDimensions(canvas, width, height);
  if (!noUpdates) Browser.updateResizeListeners();
 },
 windowedWidth: 0,
 windowedHeight: 0,
 setFullscreenCanvasSize: function() {
  if (typeof SDL != "undefined") {
   var flags = HEAPU32[SDL.screen >> 2];
   flags = flags | 8388608;
   HEAP32[SDL.screen >> 2] = flags;
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 },
 setWindowedCanvasSize: function() {
  if (typeof SDL != "undefined") {
   var flags = HEAPU32[SDL.screen >> 2];
   flags = flags & ~8388608;
   HEAP32[SDL.screen >> 2] = flags;
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 },
 updateCanvasDimensions: function(canvas, wNative, hNative) {
  if (wNative && hNative) {
   canvas.widthNative = wNative;
   canvas.heightNative = hNative;
  } else {
   wNative = canvas.widthNative;
   hNative = canvas.heightNative;
  }
  var w = wNative;
  var h = hNative;
  if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
   if (w / h < Module["forcedAspectRatio"]) {
    w = Math.round(h * Module["forcedAspectRatio"]);
   } else {
    h = Math.round(w / Module["forcedAspectRatio"]);
   }
  }
  if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode && typeof screen != "undefined") {
   var factor = Math.min(screen.width / w, screen.height / h);
   w = Math.round(w * factor);
   h = Math.round(h * factor);
  }
  if (Browser.resizeCanvas) {
   if (canvas.width != w) canvas.width = w;
   if (canvas.height != h) canvas.height = h;
   if (typeof canvas.style != "undefined") {
    canvas.style.removeProperty("width");
    canvas.style.removeProperty("height");
   }
  } else {
   if (canvas.width != wNative) canvas.width = wNative;
   if (canvas.height != hNative) canvas.height = hNative;
   if (typeof canvas.style != "undefined") {
    if (w != wNative || h != hNative) {
     canvas.style.setProperty("width", w + "px", "important");
     canvas.style.setProperty("height", h + "px", "important");
    } else {
     canvas.style.removeProperty("width");
     canvas.style.removeProperty("height");
    }
   }
  }
 }
};

function _SDL_GetTicks() {
 return Date.now() - SDL.startTime | 0;
}

function _SDL_LockSurface(surf) {
 var surfData = SDL.surfaces[surf];
 surfData.locked++;
 if (surfData.locked > 1) return 0;
 if (!surfData.buffer) {
  surfData.buffer = _malloc(surfData.width * surfData.height * 4);
  HEAPU32[surf + 20 >> 2] = surfData.buffer;
 }
 HEAPU32[surf + 20 >> 2] = surfData.buffer;
 if (surf == SDL.screen && Module.screenIsReadOnly && surfData.image) return 0;
 if (SDL.defaults.discardOnLock) {
  if (!surfData.image) {
   surfData.image = surfData.ctx.createImageData(surfData.width, surfData.height);
  }
  if (!SDL.defaults.opaqueFrontBuffer) return;
 } else {
  surfData.image = surfData.ctx.getImageData(0, 0, surfData.width, surfData.height);
 }
 if (surf == SDL.screen && SDL.defaults.opaqueFrontBuffer) {
  var data = surfData.image.data;
  var num = data.length;
  for (var i = 0; i < num / 4; i++) {
   data[i * 4 + 3] = 255;
  }
 }
 if (SDL.defaults.copyOnLock && !SDL.defaults.discardOnLock) {
  if (surfData.isFlagSet(2097152)) {
   throw "CopyOnLock is not supported for SDL_LockSurface with SDL_HWPALETTE flag set" + new Error().stack;
  } else {
   HEAPU8.set(surfData.image.data, surfData.buffer);
  }
 }
 return 0;
}

function SDL_unicode() {
 return SDL.unicode;
}

function SDL_ttfContext() {
 return SDL.ttfContext;
}

function SDL_audio() {
 return SDL.audio;
}

var wasmTableMirror = [];

var getWasmTableEntry = funcPtr => {
 var func = wasmTableMirror[funcPtr];
 if (!func) {
  if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
  wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
 }
 return func;
};

var SDL = {
 defaults: {
  width: 320,
  height: 200,
  copyOnLock: true,
  discardOnLock: false,
  opaqueFrontBuffer: true
 },
 version: null,
 surfaces: {},
 canvasPool: [],
 events: [],
 fonts: [ null ],
 audios: [ null ],
 rwops: [ null ],
 music: {
  audio: null,
  volume: 1
 },
 mixerFrequency: 22050,
 mixerFormat: 32784,
 mixerNumChannels: 2,
 mixerChunkSize: 1024,
 channelMinimumNumber: 0,
 GL: false,
 glAttributes: {
  0: 3,
  1: 3,
  2: 2,
  3: 0,
  4: 0,
  5: 1,
  6: 16,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 1,
  16: 0,
  17: 0,
  18: 0
 },
 keyboardState: null,
 keyboardMap: {},
 canRequestFullscreen: false,
 isRequestingFullscreen: false,
 textInput: false,
 startTime: null,
 initFlags: 0,
 buttonState: 0,
 modState: 0,
 DOMButtons: [ 0, 0, 0 ],
 DOMEventToSDLEvent: {},
 TOUCH_DEFAULT_ID: 0,
 eventHandler: null,
 eventHandlerContext: null,
 eventHandlerTemp: 0,
 keyCodes: {
  16: 1249,
  17: 1248,
  18: 1250,
  20: 1081,
  33: 1099,
  34: 1102,
  35: 1101,
  36: 1098,
  37: 1104,
  38: 1106,
  39: 1103,
  40: 1105,
  44: 316,
  45: 1097,
  46: 127,
  91: 1251,
  93: 1125,
  96: 1122,
  97: 1113,
  98: 1114,
  99: 1115,
  100: 1116,
  101: 1117,
  102: 1118,
  103: 1119,
  104: 1120,
  105: 1121,
  106: 1109,
  107: 1111,
  109: 1110,
  110: 1123,
  111: 1108,
  112: 1082,
  113: 1083,
  114: 1084,
  115: 1085,
  116: 1086,
  117: 1087,
  118: 1088,
  119: 1089,
  120: 1090,
  121: 1091,
  122: 1092,
  123: 1093,
  124: 1128,
  125: 1129,
  126: 1130,
  127: 1131,
  128: 1132,
  129: 1133,
  130: 1134,
  131: 1135,
  132: 1136,
  133: 1137,
  134: 1138,
  135: 1139,
  144: 1107,
  160: 94,
  161: 33,
  162: 34,
  163: 35,
  164: 36,
  165: 37,
  166: 38,
  167: 95,
  168: 40,
  169: 41,
  170: 42,
  171: 43,
  172: 124,
  173: 45,
  174: 123,
  175: 125,
  176: 126,
  181: 127,
  182: 129,
  183: 128,
  188: 44,
  190: 46,
  191: 47,
  192: 96,
  219: 91,
  220: 92,
  221: 93,
  222: 39,
  224: 1251
 },
 scanCodes: {
  8: 42,
  9: 43,
  13: 40,
  27: 41,
  32: 44,
  35: 204,
  39: 53,
  44: 54,
  46: 55,
  47: 56,
  48: 39,
  49: 30,
  50: 31,
  51: 32,
  52: 33,
  53: 34,
  54: 35,
  55: 36,
  56: 37,
  57: 38,
  58: 203,
  59: 51,
  61: 46,
  91: 47,
  92: 49,
  93: 48,
  96: 52,
  97: 4,
  98: 5,
  99: 6,
  100: 7,
  101: 8,
  102: 9,
  103: 10,
  104: 11,
  105: 12,
  106: 13,
  107: 14,
  108: 15,
  109: 16,
  110: 17,
  111: 18,
  112: 19,
  113: 20,
  114: 21,
  115: 22,
  116: 23,
  117: 24,
  118: 25,
  119: 26,
  120: 27,
  121: 28,
  122: 29,
  127: 76,
  305: 224,
  308: 226,
  316: 70
 },
 loadRect: function(rect) {
  return {
   x: HEAP32[rect + 0 >> 2],
   y: HEAP32[rect + 4 >> 2],
   w: HEAP32[rect + 8 >> 2],
   h: HEAP32[rect + 12 >> 2]
  };
 },
 updateRect: function(rect, r) {
  HEAP32[rect >> 2] = r.x;
  HEAP32[rect + 4 >> 2] = r.y;
  HEAP32[rect + 8 >> 2] = r.w;
  HEAP32[rect + 12 >> 2] = r.h;
 },
 intersectionOfRects: function(first, second) {
  var leftX = Math.max(first.x, second.x);
  var leftY = Math.max(first.y, second.y);
  var rightX = Math.min(first.x + first.w, second.x + second.w);
  var rightY = Math.min(first.y + first.h, second.y + second.h);
  return {
   x: leftX,
   y: leftY,
   w: Math.max(leftX, rightX) - leftX,
   h: Math.max(leftY, rightY) - leftY
  };
 },
 checkPixelFormat: function(fmt) {},
 loadColorToCSSRGB: function(color) {
  var rgba = HEAP32[color >> 2];
  return "rgb(" + (rgba & 255) + "," + (rgba >> 8 & 255) + "," + (rgba >> 16 & 255) + ")";
 },
 loadColorToCSSRGBA: function(color) {
  var rgba = HEAP32[color >> 2];
  return "rgba(" + (rgba & 255) + "," + (rgba >> 8 & 255) + "," + (rgba >> 16 & 255) + "," + (rgba >> 24 & 255) / 255 + ")";
 },
 translateColorToCSSRGBA: function(rgba) {
  return "rgba(" + (rgba & 255) + "," + (rgba >> 8 & 255) + "," + (rgba >> 16 & 255) + "," + (rgba >>> 24) / 255 + ")";
 },
 translateRGBAToCSSRGBA: function(r, g, b, a) {
  return "rgba(" + (r & 255) + "," + (g & 255) + "," + (b & 255) + "," + (a & 255) / 255 + ")";
 },
 translateRGBAToColor: function(r, g, b, a) {
  return r | g << 8 | b << 16 | a << 24;
 },
 makeSurface: function(width, height, flags, usePageCanvas, source, rmask, gmask, bmask, amask) {
  var is_SDL_HWSURFACE = flags & 1;
  var is_SDL_HWPALETTE = flags & 2097152;
  var is_SDL_OPENGL = flags & 67108864;
  var surf = _malloc(60);
  var pixelFormat = _malloc(44);
  var bpp = is_SDL_HWPALETTE ? 1 : 4;
  var buffer = 0;
  if (!is_SDL_HWSURFACE && !is_SDL_OPENGL) {
   buffer = _malloc(width * height * 4);
  }
  HEAP32[surf >> 2] = flags;
  HEAPU32[surf + 4 >> 2] = pixelFormat;
  HEAP32[surf + 8 >> 2] = width;
  HEAP32[surf + 12 >> 2] = height;
  HEAP32[surf + 16 >> 2] = width * bpp;
  HEAPU32[surf + 20 >> 2] = buffer;
  HEAP32[surf + 36 >> 2] = 0;
  HEAP32[surf + 40 >> 2] = 0;
  HEAP32[surf + 44 >> 2] = Module["canvas"].width;
  HEAP32[surf + 48 >> 2] = Module["canvas"].height;
  HEAP32[surf + 56 >> 2] = 1;
  HEAP32[pixelFormat >> 2] = -2042224636;
  HEAP32[pixelFormat + 4 >> 2] = 0;
  HEAP8[pixelFormat + 8 >> 0] = bpp * 8;
  HEAP8[pixelFormat + 9 >> 0] = bpp;
  HEAP32[pixelFormat + 12 >> 2] = rmask || 255;
  HEAP32[pixelFormat + 16 >> 2] = gmask || 65280;
  HEAP32[pixelFormat + 20 >> 2] = bmask || 16711680;
  HEAP32[pixelFormat + 24 >> 2] = amask || 4278190080;
  SDL.GL = SDL.GL || is_SDL_OPENGL;
  var canvas;
  if (!usePageCanvas) {
   if (SDL.canvasPool.length > 0) {
    canvas = SDL.canvasPool.pop();
   } else {
    canvas = document.createElement("canvas");
   }
   canvas.width = width;
   canvas.height = height;
  } else {
   canvas = Module["canvas"];
  }
  var webGLContextAttributes = {
   antialias: SDL.glAttributes[13] != 0 && SDL.glAttributes[14] > 1,
   depth: SDL.glAttributes[6] > 0,
   stencil: SDL.glAttributes[7] > 0,
   alpha: SDL.glAttributes[3] > 0
  };
  var ctx = Browser.createContext(canvas, is_SDL_OPENGL, usePageCanvas, webGLContextAttributes);
  SDL.surfaces[surf] = {
   width: width,
   height: height,
   canvas: canvas,
   ctx: ctx,
   surf: surf,
   buffer: buffer,
   pixelFormat: pixelFormat,
   alpha: 255,
   flags: flags,
   locked: 0,
   usePageCanvas: usePageCanvas,
   source: source,
   isFlagSet: function(flag) {
    return flags & flag;
   }
  };
  return surf;
 },
 copyIndexedColorData: function(surfData, rX, rY, rW, rH) {
  if (!surfData.colors) {
   return;
  }
  var fullWidth = Module["canvas"].width;
  var fullHeight = Module["canvas"].height;
  var startX = rX || 0;
  var startY = rY || 0;
  var endX = (rW || fullWidth - startX) + startX;
  var endY = (rH || fullHeight - startY) + startY;
  var buffer = surfData.buffer;
  if (!surfData.image.data32) {
   surfData.image.data32 = new Uint32Array(surfData.image.data.buffer);
  }
  var data32 = surfData.image.data32;
  var colors32 = surfData.colors32;
  for (var y = startY; y < endY; ++y) {
   var base = y * fullWidth;
   for (var x = startX; x < endX; ++x) {
    data32[base + x] = colors32[HEAPU8[buffer + base + x >> 0]];
   }
  }
 },
 freeSurface: function(surf) {
  var refcountPointer = surf + 56;
  var refcount = HEAP32[refcountPointer >> 2];
  if (refcount > 1) {
   HEAP32[refcountPointer >> 2] = refcount - 1;
   return;
  }
  var info = SDL.surfaces[surf];
  if (!info.usePageCanvas && info.canvas) SDL.canvasPool.push(info.canvas);
  if (info.buffer) _free(info.buffer);
  _free(info.pixelFormat);
  _free(surf);
  SDL.surfaces[surf] = null;
  if (surf === SDL.screen) {
   SDL.screen = null;
  }
 },
 blitSurface: function(src, srcrect, dst, dstrect, scale) {
  var srcData = SDL.surfaces[src];
  var dstData = SDL.surfaces[dst];
  var sr, dr;
  if (srcrect) {
   sr = SDL.loadRect(srcrect);
  } else {
   sr = {
    x: 0,
    y: 0,
    w: srcData.width,
    h: srcData.height
   };
  }
  if (dstrect) {
   dr = SDL.loadRect(dstrect);
  } else {
   dr = {
    x: 0,
    y: 0,
    w: srcData.width,
    h: srcData.height
   };
  }
  if (dstData.clipRect) {
   var widthScale = !scale || sr.w === 0 ? 1 : sr.w / dr.w;
   var heightScale = !scale || sr.h === 0 ? 1 : sr.h / dr.h;
   dr = SDL.intersectionOfRects(dstData.clipRect, dr);
   sr.w = dr.w * widthScale;
   sr.h = dr.h * heightScale;
   if (dstrect) {
    SDL.updateRect(dstrect, dr);
   }
  }
  var blitw, blith;
  if (scale) {
   blitw = dr.w;
   blith = dr.h;
  } else {
   blitw = sr.w;
   blith = sr.h;
  }
  if (sr.w === 0 || sr.h === 0 || blitw === 0 || blith === 0) {
   return 0;
  }
  var oldAlpha = dstData.ctx.globalAlpha;
  dstData.ctx.globalAlpha = srcData.alpha / 255;
  dstData.ctx.drawImage(srcData.canvas, sr.x, sr.y, sr.w, sr.h, dr.x, dr.y, blitw, blith);
  dstData.ctx.globalAlpha = oldAlpha;
  if (dst != SDL.screen) {
   warnOnce("WARNING: copying canvas data to memory for compatibility");
   _SDL_LockSurface(dst);
   dstData.locked--;
  }
  return 0;
 },
 downFingers: {},
 savedKeydown: null,
 receiveEvent: function(event) {
  function unpressAllPressedKeys() {
   for (var code in SDL.keyboardMap) {
    SDL.events.push({
     type: "keyup",
     keyCode: SDL.keyboardMap[code]
    });
   }
  }
  switch (event.type) {
  case "touchstart":
  case "touchmove":
   {
    event.preventDefault();
    var touches = [];
    if (event.type === "touchstart") {
     for (var i = 0; i < event.touches.length; i++) {
      var touch = event.touches[i];
      if (SDL.downFingers[touch.identifier] != true) {
       SDL.downFingers[touch.identifier] = true;
       touches.push(touch);
      }
     }
    } else {
     touches = event.touches;
    }
    var firstTouch = touches[0];
    if (firstTouch) {
     if (event.type == "touchstart") {
      SDL.DOMButtons[0] = 1;
     }
     var mouseEventType;
     switch (event.type) {
     case "touchstart":
      mouseEventType = "mousedown";
      break;

     case "touchmove":
      mouseEventType = "mousemove";
      break;
     }
     var mouseEvent = {
      type: mouseEventType,
      button: 0,
      pageX: firstTouch.clientX,
      pageY: firstTouch.clientY
     };
     SDL.events.push(mouseEvent);
    }
    for (var i = 0; i < touches.length; i++) {
     var touch = touches[i];
     SDL.events.push({
      type: event.type,
      touch: touch
     });
    }
    break;
   }

  case "touchend":
   {
    event.preventDefault();
    for (var i = 0; i < event.changedTouches.length; i++) {
     var touch = event.changedTouches[i];
     if (SDL.downFingers[touch.identifier] === true) {
      delete SDL.downFingers[touch.identifier];
     }
    }
    var mouseEvent = {
     type: "mouseup",
     button: 0,
     pageX: event.changedTouches[0].clientX,
     pageY: event.changedTouches[0].clientY
    };
    SDL.DOMButtons[0] = 0;
    SDL.events.push(mouseEvent);
    for (var i = 0; i < event.changedTouches.length; i++) {
     var touch = event.changedTouches[i];
     SDL.events.push({
      type: "touchend",
      touch: touch
     });
    }
    break;
   }

  case "DOMMouseScroll":
  case "mousewheel":
  case "wheel":
   var delta = -Browser.getMouseWheelDelta(event);
   delta = delta == 0 ? 0 : delta > 0 ? Math.max(delta, 1) : Math.min(delta, -1);
   var button = delta > 0 ? 3 : 4;
   SDL.events.push({
    type: "mousedown",
    button: button,
    pageX: event.pageX,
    pageY: event.pageY
   });
   SDL.events.push({
    type: "mouseup",
    button: button,
    pageX: event.pageX,
    pageY: event.pageY
   });
   SDL.events.push({
    type: "wheel",
    deltaX: 0,
    deltaY: delta
   });
   event.preventDefault();
   break;

  case "mousemove":
   if (SDL.DOMButtons[0] === 1) {
    SDL.events.push({
     type: "touchmove",
     touch: {
      identifier: 0,
      deviceID: -1,
      pageX: event.pageX,
      pageY: event.pageY
     }
    });
   }
   if (Browser.pointerLock) {
    if ("mozMovementX" in event) {
     event["movementX"] = event["mozMovementX"];
     event["movementY"] = event["mozMovementY"];
    }
    if (event["movementX"] == 0 && event["movementY"] == 0) {
     event.preventDefault();
     return;
    }
   }

  case "keydown":
  case "keyup":
  case "keypress":
  case "mousedown":
  case "mouseup":
   if (event.type !== "keydown" || !SDL_unicode() && !SDL.textInput || (event.keyCode === 8 || event.keyCode === 9)) {
    event.preventDefault();
   }
   if (event.type == "mousedown") {
    SDL.DOMButtons[event.button] = 1;
    SDL.events.push({
     type: "touchstart",
     touch: {
      identifier: 0,
      deviceID: -1,
      pageX: event.pageX,
      pageY: event.pageY
     }
    });
   } else if (event.type == "mouseup") {
    if (!SDL.DOMButtons[event.button]) {
     return;
    }
    SDL.events.push({
     type: "touchend",
     touch: {
      identifier: 0,
      deviceID: -1,
      pageX: event.pageX,
      pageY: event.pageY
     }
    });
    SDL.DOMButtons[event.button] = 0;
   }
   if (event.type === "keydown" || event.type === "mousedown") {
    SDL.canRequestFullscreen = true;
   } else if (event.type === "keyup" || event.type === "mouseup") {
    if (SDL.isRequestingFullscreen) {
     Module["requestFullscreen"](true, true);
     SDL.isRequestingFullscreen = false;
    }
    SDL.canRequestFullscreen = false;
   }
   if (event.type === "keypress" && SDL.savedKeydown) {
    SDL.savedKeydown.keypressCharCode = event.charCode;
    SDL.savedKeydown = null;
   } else if (event.type === "keydown") {
    SDL.savedKeydown = event;
   }
   if (event.type !== "keypress" || SDL.textInput) {
    SDL.events.push(event);
   }
   break;

  case "mouseout":
   for (var i = 0; i < 3; i++) {
    if (SDL.DOMButtons[i]) {
     SDL.events.push({
      type: "mouseup",
      button: i,
      pageX: event.pageX,
      pageY: event.pageY
     });
     SDL.DOMButtons[i] = 0;
    }
   }
   event.preventDefault();
   break;

  case "focus":
   SDL.events.push(event);
   event.preventDefault();
   break;

  case "blur":
   SDL.events.push(event);
   unpressAllPressedKeys();
   event.preventDefault();
   break;

  case "visibilitychange":
   SDL.events.push({
    type: "visibilitychange",
    visible: !document.hidden
   });
   unpressAllPressedKeys();
   event.preventDefault();
   break;

  case "unload":
   if (Browser.mainLoop.runner) {
    SDL.events.push(event);
    Browser.mainLoop.runner();
   }
   return;

  case "resize":
   SDL.events.push(event);
   if (event.preventDefault) {
    event.preventDefault();
   }
   break;
  }
  if (SDL.events.length >= 1e4) {
   err("SDL event queue full, dropping events");
   SDL.events = SDL.events.slice(0, 1e4);
  }
  SDL.flushEventsToHandler();
  return;
 },
 lookupKeyCodeForEvent: function(event) {
  var code = event.keyCode;
  if (code >= 65 && code <= 90) {
   code += 32;
  } else {
   code = SDL.keyCodes[event.keyCode] || event.keyCode;
   if (event.location === 2 && code >= (224 | 1 << 10) && code <= (227 | 1 << 10)) {
    code += 4;
   }
  }
  return code;
 },
 handleEvent: function(event) {
  if (event.handled) return;
  event.handled = true;
  switch (event.type) {
  case "touchstart":
  case "touchend":
  case "touchmove":
   {
    Browser.calculateMouseEvent(event);
    break;
   }

  case "keydown":
  case "keyup":
   {
    var down = event.type === "keydown";
    var code = SDL.lookupKeyCodeForEvent(event);
    HEAP8[SDL.keyboardState + code >> 0] = down;
    SDL.modState = (HEAP8[SDL.keyboardState + 1248 >> 0] ? 64 : 0) | (HEAP8[SDL.keyboardState + 1249 >> 0] ? 1 : 0) | (HEAP8[SDL.keyboardState + 1250 >> 0] ? 256 : 0) | (HEAP8[SDL.keyboardState + 1252 >> 0] ? 128 : 0) | (HEAP8[SDL.keyboardState + 1253 >> 0] ? 2 : 0) | (HEAP8[SDL.keyboardState + 1254 >> 0] ? 512 : 0);
    if (down) {
     SDL.keyboardMap[code] = event.keyCode;
    } else {
     delete SDL.keyboardMap[code];
    }
    break;
   }

  case "mousedown":
  case "mouseup":
   if (event.type == "mousedown") {
    SDL.buttonState |= 1 << event.button;
   } else if (event.type == "mouseup") {
    SDL.buttonState &= ~(1 << event.button);
   }

  case "mousemove":
   {
    Browser.calculateMouseEvent(event);
    break;
   }
  }
 },
 flushEventsToHandler: function() {
  if (!SDL.eventHandler) return;
  while (SDL.pollEvent(SDL.eventHandlerTemp)) {
   getWasmTableEntry(SDL.eventHandler)(SDL.eventHandlerContext, SDL.eventHandlerTemp);
  }
 },
 pollEvent: function(ptr) {
  if (SDL.initFlags & 512 && SDL.joystickEventState) {
   SDL.queryJoysticks();
  }
  if (ptr) {
   while (SDL.events.length > 0) {
    if (SDL.makeCEvent(SDL.events.shift(), ptr) !== false) return 1;
   }
   return 0;
  }
  return SDL.events.length > 0;
 },
 makeCEvent: function(event, ptr) {
  if (typeof event == "number") {
   _memcpy(ptr, event, 28);
   _free(event);
   return;
  }
  SDL.handleEvent(event);
  switch (event.type) {
  case "keydown":
  case "keyup":
   {
    var down = event.type === "keydown";
    var key = SDL.lookupKeyCodeForEvent(event);
    var scan;
    if (key >= 1024) {
     scan = key - 1024;
    } else {
     scan = SDL.scanCodes[key] || key;
    }
    HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
    HEAP8[ptr + 8 >> 0] = down ? 1 : 0;
    HEAP8[ptr + 9 >> 0] = 0;
    HEAP32[ptr + 12 >> 2] = scan;
    HEAP32[ptr + 16 >> 2] = key;
    HEAP16[ptr + 20 >> 1] = SDL.modState;
    HEAP32[ptr + 24 >> 2] = event.keypressCharCode || key;
    break;
   }

  case "keypress":
   {
    HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
    var cStr = intArrayFromString(String.fromCharCode(event.charCode));
    for (var i = 0; i < cStr.length; ++i) {
     HEAP8[ptr + (8 + i) >> 0] = cStr[i];
    }
    break;
   }

  case "mousedown":
  case "mouseup":
  case "mousemove":
   {
    if (event.type != "mousemove") {
     var down = event.type === "mousedown";
     HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
     HEAP32[ptr + 4 >> 2] = 0;
     HEAP32[ptr + 8 >> 2] = 0;
     HEAP32[ptr + 12 >> 2] = 0;
     HEAP8[ptr + 16 >> 0] = event.button + 1;
     HEAP8[ptr + 17 >> 0] = down ? 1 : 0;
     HEAP32[ptr + 20 >> 2] = Browser.mouseX;
     HEAP32[ptr + 24 >> 2] = Browser.mouseY;
    } else {
     HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
     HEAP32[ptr + 4 >> 2] = 0;
     HEAP32[ptr + 8 >> 2] = 0;
     HEAP32[ptr + 12 >> 2] = 0;
     HEAP32[ptr + 16 >> 2] = SDL.buttonState;
     HEAP32[ptr + 20 >> 2] = Browser.mouseX;
     HEAP32[ptr + 24 >> 2] = Browser.mouseY;
     HEAP32[ptr + 28 >> 2] = Browser.mouseMovementX;
     HEAP32[ptr + 32 >> 2] = Browser.mouseMovementY;
    }
    break;
   }

  case "wheel":
   {
    HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
    HEAP32[ptr + 16 >> 2] = event.deltaX;
    HEAP32[ptr + 20 >> 2] = event.deltaY;
    break;
   }

  case "touchstart":
  case "touchend":
  case "touchmove":
   {
    var touch = event.touch;
    if (!Browser.touches[touch.identifier]) break;
    var w = Module["canvas"].width;
    var h = Module["canvas"].height;
    var x = Browser.touches[touch.identifier].x / w;
    var y = Browser.touches[touch.identifier].y / h;
    var lx = Browser.lastTouches[touch.identifier].x / w;
    var ly = Browser.lastTouches[touch.identifier].y / h;
    var dx = x - lx;
    var dy = y - ly;
    if (touch["deviceID"] === undefined) touch.deviceID = SDL.TOUCH_DEFAULT_ID;
    if (dx === 0 && dy === 0 && event.type === "touchmove") return false;
    HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
    HEAP32[ptr + 4 >> 2] = _SDL_GetTicks();
    tempI64 = [ touch.deviceID >>> 0, (tempDouble = touch.deviceID, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
    HEAP32[ptr + 8 >> 2] = tempI64[0], HEAP32[ptr + 12 >> 2] = tempI64[1];
    tempI64 = [ touch.identifier >>> 0, (tempDouble = touch.identifier, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
    HEAP32[ptr + 16 >> 2] = tempI64[0], HEAP32[ptr + 20 >> 2] = tempI64[1];
    HEAPF32[ptr + 24 >> 2] = x;
    HEAPF32[ptr + 28 >> 2] = y;
    HEAPF32[ptr + 32 >> 2] = dx;
    HEAPF32[ptr + 36 >> 2] = dy;
    if (touch.force !== undefined) {
     HEAPF32[ptr + 40 >> 2] = touch.force;
    } else {
     HEAPF32[ptr + 40 >> 2] = event.type == "touchend" ? 0 : 1;
    }
    break;
   }

  case "unload":
   {
    HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
    break;
   }

  case "resize":
   {
    HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
    HEAP32[ptr + 4 >> 2] = event.w;
    HEAP32[ptr + 8 >> 2] = event.h;
    break;
   }

  case "joystick_button_up":
  case "joystick_button_down":
   {
    var state = event.type === "joystick_button_up" ? 0 : 1;
    HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
    HEAP8[ptr + 4 >> 0] = event.index;
    HEAP8[ptr + 5 >> 0] = event.button;
    HEAP8[ptr + 6 >> 0] = state;
    break;
   }

  case "joystick_axis_motion":
   {
    HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
    HEAP8[ptr + 4 >> 0] = event.index;
    HEAP8[ptr + 5 >> 0] = event.axis;
    HEAP32[ptr + 8 >> 2] = SDL.joystickAxisValueConversion(event.value);
    break;
   }

  case "focus":
   {
    var SDL_WINDOWEVENT_FOCUS_GAINED = 12;
    HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
    HEAP32[ptr + 4 >> 2] = 0;
    HEAP8[ptr + 8 >> 0] = SDL_WINDOWEVENT_FOCUS_GAINED;
    break;
   }

  case "blur":
   {
    var SDL_WINDOWEVENT_FOCUS_LOST = 13;
    HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
    HEAP32[ptr + 4 >> 2] = 0;
    HEAP8[ptr + 8 >> 0] = SDL_WINDOWEVENT_FOCUS_LOST;
    break;
   }

  case "visibilitychange":
   {
    var SDL_WINDOWEVENT_SHOWN = 1;
    var SDL_WINDOWEVENT_HIDDEN = 2;
    var visibilityEventID = event.visible ? SDL_WINDOWEVENT_SHOWN : SDL_WINDOWEVENT_HIDDEN;
    HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
    HEAP32[ptr + 4 >> 2] = 0;
    HEAP8[ptr + 8 >> 0] = visibilityEventID;
    break;
   }

  default:
   throw "Unhandled SDL event: " + event.type;
  }
 },
 makeFontString: function(height, fontName) {
  if (fontName.charAt(0) != "'" && fontName.charAt(0) != '"') {
   fontName = '"' + fontName + '"';
  }
  return height + "px " + fontName + ", serif";
 },
 estimateTextWidth: function(fontData, text) {
  var h = fontData.size;
  var fontString = SDL.makeFontString(h, fontData.name);
  var tempCtx = SDL_ttfContext();
  tempCtx.font = fontString;
  var ret = tempCtx.measureText(text).width | 0;
  return ret;
 },
 allocateChannels: function(num) {
  if (SDL.numChannels && SDL.numChannels >= num && num != 0) return;
  SDL.numChannels = num;
  SDL.channels = [];
  for (var i = 0; i < num; i++) {
   SDL.channels[i] = {
    audio: null,
    volume: 1
   };
  }
 },
 setGetVolume: function(info, volume) {
  if (!info) return 0;
  var ret = info.volume * 128;
  if (volume != -1) {
   info.volume = Math.min(Math.max(volume, 0), 128) / 128;
   if (info.audio) {
    try {
     info.audio.volume = info.volume;
     if (info.audio.webAudioGainNode) info.audio.webAudioGainNode["gain"]["value"] = info.volume;
    } catch (e) {
     err("setGetVolume failed to set audio volume: " + e);
    }
   }
  }
  return ret;
 },
 setPannerPosition: function(info, x, y, z) {
  if (!info) return;
  if (info.audio) {
   if (info.audio.webAudioPannerNode) {
    info.audio.webAudioPannerNode["setPosition"](x, y, z);
   }
  }
 },
 playWebAudio: function(audio) {
  if (!audio) return;
  if (audio.webAudioNode) return;
  if (!SDL.webAudioAvailable()) return;
  try {
   var webAudio = audio.resource.webAudio;
   audio.paused = false;
   if (!webAudio.decodedBuffer) {
    if (webAudio.onDecodeComplete === undefined) abort("Cannot play back audio object that was not loaded");
    webAudio.onDecodeComplete.push(() => {
     if (!audio.paused) SDL.playWebAudio(audio);
    });
    return;
   }
   audio.webAudioNode = SDL.audioContext["createBufferSource"]();
   audio.webAudioNode["buffer"] = webAudio.decodedBuffer;
   audio.webAudioNode["loop"] = audio.loop;
   audio.webAudioNode["onended"] = audio["onended"];
   audio.webAudioPannerNode = SDL.audioContext["createPanner"]();
   audio.webAudioPannerNode["setPosition"](0, 0, -.5);
   audio.webAudioPannerNode["panningModel"] = "equalpower";
   audio.webAudioGainNode = SDL.audioContext["createGain"]();
   audio.webAudioGainNode["gain"]["value"] = audio.volume;
   audio.webAudioNode["connect"](audio.webAudioPannerNode);
   audio.webAudioPannerNode["connect"](audio.webAudioGainNode);
   audio.webAudioGainNode["connect"](SDL.audioContext["destination"]);
   audio.webAudioNode["start"](0, audio.currentPosition);
   audio.startTime = SDL.audioContext["currentTime"] - audio.currentPosition;
  } catch (e) {
   err("playWebAudio failed: " + e);
  }
 },
 pauseWebAudio: function(audio) {
  if (!audio) return;
  if (audio.webAudioNode) {
   try {
    audio.currentPosition = (SDL.audioContext["currentTime"] - audio.startTime) % audio.resource.webAudio.decodedBuffer.duration;
    audio.webAudioNode["onended"] = undefined;
    audio.webAudioNode.stop(0);
    audio.webAudioNode = undefined;
   } catch (e) {
    err("pauseWebAudio failed: " + e);
   }
  }
  audio.paused = true;
 },
 openAudioContext: function() {
  if (!SDL.audioContext) {
   if (typeof AudioContext != "undefined") SDL.audioContext = new AudioContext(); else if (typeof webkitAudioContext != "undefined") SDL.audioContext = new webkitAudioContext();
  }
 },
 webAudioAvailable: function() {
  return !!SDL.audioContext;
 },
 fillWebAudioBufferFromHeap: function(heapPtr, sizeSamplesPerChannel, dstAudioBuffer) {
  var audio = SDL_audio();
  var numChannels = audio.channels;
  for (var c = 0; c < numChannels; ++c) {
   var channelData = dstAudioBuffer["getChannelData"](c);
   if (channelData.length != sizeSamplesPerChannel) {
    throw "Web Audio output buffer length mismatch! Destination size: " + channelData.length + " samples vs expected " + sizeSamplesPerChannel + " samples!";
   }
   if (audio.format == 32784) {
    for (var j = 0; j < sizeSamplesPerChannel; ++j) {
     channelData[j] = HEAP16[heapPtr + (j * numChannels + c) * 2 >> 1] / 32768;
    }
   } else if (audio.format == 8) {
    for (var j = 0; j < sizeSamplesPerChannel; ++j) {
     var v = HEAP8[heapPtr + (j * numChannels + c) >> 0];
     channelData[j] = (v >= 0 ? v - 128 : v + 128) / 128;
    }
   } else if (audio.format == 33056) {
    for (var j = 0; j < sizeSamplesPerChannel; ++j) {
     channelData[j] = HEAPF32[heapPtr + (j * numChannels + c) * 4 >> 2];
    }
   } else {
    throw "Invalid SDL audio format " + audio.format + "!";
   }
  }
 },
 debugSurface: function(surfData) {
  out("dumping surface " + [ surfData.surf, surfData.source, surfData.width, surfData.height ]);
  var image = surfData.ctx.getImageData(0, 0, surfData.width, surfData.height);
  var data = image.data;
  var num = Math.min(surfData.width, surfData.height);
  for (var i = 0; i < num; i++) {
   out("   diagonal " + i + ":" + [ data[i * surfData.width * 4 + i * 4 + 0], data[i * surfData.width * 4 + i * 4 + 1], data[i * surfData.width * 4 + i * 4 + 2], data[i * surfData.width * 4 + i * 4 + 3] ]);
  }
 },
 joystickEventState: 1,
 lastJoystickState: {},
 joystickNamePool: {},
 recordJoystickState: function(joystick, state) {
  var buttons = new Array(state.buttons.length);
  for (var i = 0; i < state.buttons.length; i++) {
   buttons[i] = SDL.getJoystickButtonState(state.buttons[i]);
  }
  SDL.lastJoystickState[joystick] = {
   buttons: buttons,
   axes: state.axes.slice(0),
   timestamp: state.timestamp,
   index: state.index,
   id: state.id
  };
 },
 getJoystickButtonState: function(button) {
  if (typeof button == "object") {
   return button["pressed"];
  }
  return button > 0;
 },
 queryJoysticks: function() {
  for (var joystick in SDL.lastJoystickState) {
   var state = SDL.getGamepad(joystick - 1);
   var prevState = SDL.lastJoystickState[joystick];
   if (typeof state == "undefined") return;
   if (state === null) return;
   if (typeof state.timestamp != "number" || state.timestamp != prevState.timestamp || !state.timestamp) {
    var i;
    for (i = 0; i < state.buttons.length; i++) {
     var buttonState = SDL.getJoystickButtonState(state.buttons[i]);
     if (buttonState !== prevState.buttons[i]) {
      SDL.events.push({
       type: buttonState ? "joystick_button_down" : "joystick_button_up",
       joystick: joystick,
       index: joystick - 1,
       button: i
      });
     }
    }
    for (i = 0; i < state.axes.length; i++) {
     if (state.axes[i] !== prevState.axes[i]) {
      SDL.events.push({
       type: "joystick_axis_motion",
       joystick: joystick,
       index: joystick - 1,
       axis: i,
       value: state.axes[i]
      });
     }
    }
    SDL.recordJoystickState(joystick, state);
   }
  }
 },
 joystickAxisValueConversion: function(value) {
  value = Math.min(1, Math.max(value, -1));
  return Math.ceil((value + 1) * 32767.5 - 32768);
 },
 getGamepads: function() {
  var fcn = navigator.getGamepads || navigator.webkitGamepads || navigator.mozGamepads || navigator.gamepads || navigator.webkitGetGamepads;
  if (fcn !== undefined) {
   return fcn.apply(navigator);
  }
  return [];
 },
 getGamepad: function(deviceIndex) {
  var gamepads = SDL.getGamepads();
  if (gamepads.length > deviceIndex && deviceIndex >= 0) {
   return gamepads[deviceIndex];
  }
  return null;
 }
};

function _SDL_GL_SwapBuffers() {
 if (Browser.doSwapBuffers) Browser.doSwapBuffers();
}

function _SDL_Init(initFlags) {
 SDL.startTime = Date.now();
 SDL.initFlags = initFlags;
 if (!Module["doNotCaptureKeyboard"]) {
  var keyboardListeningElement = Module["keyboardListeningElement"] || document;
  keyboardListeningElement.addEventListener("keydown", SDL.receiveEvent);
  keyboardListeningElement.addEventListener("keyup", SDL.receiveEvent);
  keyboardListeningElement.addEventListener("keypress", SDL.receiveEvent);
  window.addEventListener("focus", SDL.receiveEvent);
  window.addEventListener("blur", SDL.receiveEvent);
  document.addEventListener("visibilitychange", SDL.receiveEvent);
 }
 window.addEventListener("unload", SDL.receiveEvent);
 SDL.keyboardState = _malloc(65536);
 zeroMemory(SDL.keyboardState, 65536);
 SDL.DOMEventToSDLEvent["keydown"] = 768;
 SDL.DOMEventToSDLEvent["keyup"] = 769;
 SDL.DOMEventToSDLEvent["keypress"] = 771;
 SDL.DOMEventToSDLEvent["mousedown"] = 1025;
 SDL.DOMEventToSDLEvent["mouseup"] = 1026;
 SDL.DOMEventToSDLEvent["mousemove"] = 1024;
 SDL.DOMEventToSDLEvent["wheel"] = 1027;
 SDL.DOMEventToSDLEvent["touchstart"] = 1792;
 SDL.DOMEventToSDLEvent["touchend"] = 1793;
 SDL.DOMEventToSDLEvent["touchmove"] = 1794;
 SDL.DOMEventToSDLEvent["unload"] = 256;
 SDL.DOMEventToSDLEvent["resize"] = 28673;
 SDL.DOMEventToSDLEvent["visibilitychange"] = 512;
 SDL.DOMEventToSDLEvent["focus"] = 512;
 SDL.DOMEventToSDLEvent["blur"] = 512;
 SDL.DOMEventToSDLEvent["joystick_axis_motion"] = 1536;
 SDL.DOMEventToSDLEvent["joystick_button_down"] = 1539;
 SDL.DOMEventToSDLEvent["joystick_button_up"] = 1540;
 return 0;
}

function _SDL_PollEvent(ptr) {
 return SDL.pollEvent(ptr);
}

function webgl_enable_ANGLE_instanced_arrays(ctx) {
 var ext = ctx.getExtension("ANGLE_instanced_arrays");
 if (ext) {
  ctx["vertexAttribDivisor"] = function(index, divisor) {
   ext["vertexAttribDivisorANGLE"](index, divisor);
  };
  ctx["drawArraysInstanced"] = function(mode, first, count, primcount) {
   ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
  };
  ctx["drawElementsInstanced"] = function(mode, count, type, indices, primcount) {
   ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
  };
  return 1;
 }
}

function webgl_enable_OES_vertex_array_object(ctx) {
 var ext = ctx.getExtension("OES_vertex_array_object");
 if (ext) {
  ctx["createVertexArray"] = function() {
   return ext["createVertexArrayOES"]();
  };
  ctx["deleteVertexArray"] = function(vao) {
   ext["deleteVertexArrayOES"](vao);
  };
  ctx["bindVertexArray"] = function(vao) {
   ext["bindVertexArrayOES"](vao);
  };
  ctx["isVertexArray"] = function(vao) {
   return ext["isVertexArrayOES"](vao);
  };
  return 1;
 }
}

function webgl_enable_WEBGL_draw_buffers(ctx) {
 var ext = ctx.getExtension("WEBGL_draw_buffers");
 if (ext) {
  ctx["drawBuffers"] = function(n, bufs) {
   ext["drawBuffersWEBGL"](n, bufs);
  };
  return 1;
 }
}

function webgl_enable_WEBGL_multi_draw(ctx) {
 return !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"));
}

var GL = {
 counter: 1,
 buffers: [],
 programs: [],
 framebuffers: [],
 renderbuffers: [],
 textures: [],
 shaders: [],
 vaos: [],
 contexts: [],
 offscreenCanvases: {},
 queries: [],
 byteSizeByTypeRoot: 5120,
 byteSizeByType: [ 1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8 ],
 stringCache: {},
 unpackAlignment: 4,
 recordError: function recordError(errorCode) {
  if (!GL.lastError) {
   GL.lastError = errorCode;
  }
 },
 getNewId: function(table) {
  var ret = GL.counter++;
  for (var i = table.length; i < ret; i++) {
   table[i] = null;
  }
  return ret;
 },
 MAX_TEMP_BUFFER_SIZE: 2097152,
 numTempVertexBuffersPerSize: 64,
 log2ceilLookup: function(i) {
  return 32 - Math.clz32(i === 0 ? 0 : i - 1);
 },
 generateTempBuffers: function(quads, context) {
  var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
  context.tempVertexBufferCounters1 = [];
  context.tempVertexBufferCounters2 = [];
  context.tempVertexBufferCounters1.length = context.tempVertexBufferCounters2.length = largestIndex + 1;
  context.tempVertexBuffers1 = [];
  context.tempVertexBuffers2 = [];
  context.tempVertexBuffers1.length = context.tempVertexBuffers2.length = largestIndex + 1;
  context.tempIndexBuffers = [];
  context.tempIndexBuffers.length = largestIndex + 1;
  for (var i = 0; i <= largestIndex; ++i) {
   context.tempIndexBuffers[i] = null;
   context.tempVertexBufferCounters1[i] = context.tempVertexBufferCounters2[i] = 0;
   var ringbufferLength = GL.numTempVertexBuffersPerSize;
   context.tempVertexBuffers1[i] = [];
   context.tempVertexBuffers2[i] = [];
   var ringbuffer1 = context.tempVertexBuffers1[i];
   var ringbuffer2 = context.tempVertexBuffers2[i];
   ringbuffer1.length = ringbuffer2.length = ringbufferLength;
   for (var j = 0; j < ringbufferLength; ++j) {
    ringbuffer1[j] = ringbuffer2[j] = null;
   }
  }
  if (quads) {
   context.tempQuadIndexBuffer = GLctx.createBuffer();
   context.GLctx.bindBuffer(34963, context.tempQuadIndexBuffer);
   var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
   var quadIndexes = new Uint16Array(numIndexes);
   var i = 0, v = 0;
   while (1) {
    quadIndexes[i++] = v;
    if (i >= numIndexes) break;
    quadIndexes[i++] = v + 1;
    if (i >= numIndexes) break;
    quadIndexes[i++] = v + 2;
    if (i >= numIndexes) break;
    quadIndexes[i++] = v;
    if (i >= numIndexes) break;
    quadIndexes[i++] = v + 2;
    if (i >= numIndexes) break;
    quadIndexes[i++] = v + 3;
    if (i >= numIndexes) break;
    v += 4;
   }
   context.GLctx.bufferData(34963, quadIndexes, 35044);
   context.GLctx.bindBuffer(34963, null);
  }
 },
 getTempVertexBuffer: function getTempVertexBuffer(sizeBytes) {
  var idx = GL.log2ceilLookup(sizeBytes);
  var ringbuffer = GL.currentContext.tempVertexBuffers1[idx];
  var nextFreeBufferIndex = GL.currentContext.tempVertexBufferCounters1[idx];
  GL.currentContext.tempVertexBufferCounters1[idx] = GL.currentContext.tempVertexBufferCounters1[idx] + 1 & GL.numTempVertexBuffersPerSize - 1;
  var vbo = ringbuffer[nextFreeBufferIndex];
  if (vbo) {
   return vbo;
  }
  var prevVBO = GLctx.getParameter(34964);
  ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer();
  GLctx.bindBuffer(34962, ringbuffer[nextFreeBufferIndex]);
  GLctx.bufferData(34962, 1 << idx, 35048);
  GLctx.bindBuffer(34962, prevVBO);
  return ringbuffer[nextFreeBufferIndex];
 },
 getTempIndexBuffer: function getTempIndexBuffer(sizeBytes) {
  var idx = GL.log2ceilLookup(sizeBytes);
  var ibo = GL.currentContext.tempIndexBuffers[idx];
  if (ibo) {
   return ibo;
  }
  var prevIBO = GLctx.getParameter(34965);
  GL.currentContext.tempIndexBuffers[idx] = GLctx.createBuffer();
  GLctx.bindBuffer(34963, GL.currentContext.tempIndexBuffers[idx]);
  GLctx.bufferData(34963, 1 << idx, 35048);
  GLctx.bindBuffer(34963, prevIBO);
  return GL.currentContext.tempIndexBuffers[idx];
 },
 newRenderingFrameStarted: function newRenderingFrameStarted() {
  if (!GL.currentContext) {
   return;
  }
  var vb = GL.currentContext.tempVertexBuffers1;
  GL.currentContext.tempVertexBuffers1 = GL.currentContext.tempVertexBuffers2;
  GL.currentContext.tempVertexBuffers2 = vb;
  vb = GL.currentContext.tempVertexBufferCounters1;
  GL.currentContext.tempVertexBufferCounters1 = GL.currentContext.tempVertexBufferCounters2;
  GL.currentContext.tempVertexBufferCounters2 = vb;
  var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
  for (var i = 0; i <= largestIndex; ++i) {
   GL.currentContext.tempVertexBufferCounters1[i] = 0;
  }
 },
 getSource: function(shader, count, string, length) {
  var source = "";
  for (var i = 0; i < count; ++i) {
   var len = length ? HEAP32[length + i * 4 >> 2] : -1;
   source += UTF8ToString(HEAP32[string + i * 4 >> 2], len < 0 ? undefined : len);
  }
  return source;
 },
 calcBufLength: function calcBufLength(size, type, stride, count) {
  if (stride > 0) {
   return count * stride;
  }
  var typeSize = GL.byteSizeByType[type - GL.byteSizeByTypeRoot];
  return size * typeSize * count;
 },
 usedTempBuffers: [],
 preDrawHandleClientVertexAttribBindings: function preDrawHandleClientVertexAttribBindings(count) {
  GL.resetBufferBinding = false;
  for (var i = 0; i < GL.currentContext.maxVertexAttribs; ++i) {
   var cb = GL.currentContext.clientBuffers[i];
   if (!cb.clientside || !cb.enabled) continue;
   GL.resetBufferBinding = true;
   var size = GL.calcBufLength(cb.size, cb.type, cb.stride, count);
   var buf = GL.getTempVertexBuffer(size);
   GLctx.bindBuffer(34962, buf);
   GLctx.bufferSubData(34962, 0, HEAPU8.subarray(cb.ptr, cb.ptr + size));
   cb.vertexAttribPointerAdaptor.call(GLctx, i, cb.size, cb.type, cb.normalized, cb.stride, 0);
  }
 },
 postDrawHandleClientVertexAttribBindings: function postDrawHandleClientVertexAttribBindings() {
  if (GL.resetBufferBinding) {
   GLctx.bindBuffer(34962, GL.buffers[GLctx.currentArrayBufferBinding]);
  }
 },
 createContext: function(canvas, webGLContextAttributes) {
  if (!canvas.getContextSafariWebGL2Fixed) {
   canvas.getContextSafariWebGL2Fixed = canvas.getContext;
   function fixedGetContext(ver, attrs) {
    var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
    return ver == "webgl" == gl instanceof WebGLRenderingContext ? gl : null;
   }
   canvas.getContext = fixedGetContext;
  }
  var ctx = canvas.getContext("webgl", webGLContextAttributes);
  if (!ctx) return 0;
  var handle = GL.registerContext(ctx, webGLContextAttributes);
  return handle;
 },
 registerContext: function(ctx, webGLContextAttributes) {
  var handle = GL.getNewId(GL.contexts);
  var context = {
   handle: handle,
   attributes: webGLContextAttributes,
   version: webGLContextAttributes.majorVersion,
   GLctx: ctx
  };
  if (ctx.canvas) ctx.canvas.GLctxObject = context;
  GL.contexts[handle] = context;
  if (typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
   GL.initExtensions(context);
  }
  context.maxVertexAttribs = context.GLctx.getParameter(34921);
  context.clientBuffers = [];
  for (var i = 0; i < context.maxVertexAttribs; i++) {
   context.clientBuffers[i] = {
    enabled: false,
    clientside: false,
    size: 0,
    type: 0,
    normalized: 0,
    stride: 0,
    ptr: 0,
    vertexAttribPointerAdaptor: null
   };
  }
  GL.generateTempBuffers(false, context);
  return handle;
 },
 makeContextCurrent: function(contextHandle) {
  GL.currentContext = GL.contexts[contextHandle];
  Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx;
  return !(contextHandle && !GLctx);
 },
 getContext: function(contextHandle) {
  return GL.contexts[contextHandle];
 },
 deleteContext: function(contextHandle) {
  if (GL.currentContext === GL.contexts[contextHandle]) GL.currentContext = null;
  if (typeof JSEvents == "object") JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
  if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
  GL.contexts[contextHandle] = null;
 },
 initExtensions: function(context) {
  if (!context) context = GL.currentContext;
  if (context.initExtensionsDone) return;
  context.initExtensionsDone = true;
  var GLctx = context.GLctx;
  webgl_enable_ANGLE_instanced_arrays(GLctx);
  webgl_enable_OES_vertex_array_object(GLctx);
  webgl_enable_WEBGL_draw_buffers(GLctx);
  {
   GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
  }
  webgl_enable_WEBGL_multi_draw(GLctx);
  var exts = GLctx.getSupportedExtensions() || [];
  exts.forEach(function(ext) {
   if (!ext.includes("lose_context") && !ext.includes("debug")) {
    GLctx.getExtension(ext);
   }
  });
 }
};

var _SDL_SetVideoMode = function(width, height, depth, flags) {
 [ "touchstart", "touchend", "touchmove", "mousedown", "mouseup", "mousemove", "mousewheel", "wheel", "mouseout", "DOMMouseScroll" ].forEach(e => Module["canvas"].addEventListener(e, SDL.receiveEvent, true));
 var canvas = Module["canvas"];
 if (width == 0 && height == 0) {
  width = canvas.width;
  height = canvas.height;
 }
 if (!SDL.addedResizeListener) {
  SDL.addedResizeListener = true;
  Browser.resizeListeners.push((w, h) => {
   if (!SDL.settingVideoMode) {
    SDL.receiveEvent({
     type: "resize",
     w: w,
     h: h
    });
   }
  });
 }
 SDL.settingVideoMode = true;
 Browser.setCanvasSize(width, height);
 SDL.settingVideoMode = false;
 if (SDL.screen) {
  SDL.freeSurface(SDL.screen);
  assert(!SDL.screen);
 }
 if (SDL.GL) flags = flags | 67108864;
 SDL.screen = SDL.makeSurface(width, height, flags, true, "screen");
 return SDL.screen;
};

var ___assert_fail = (condition, filename, line, func) => {
 abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
};

var exceptionLast = 0;

function ExceptionInfo(excPtr) {
 this.excPtr = excPtr;
 this.ptr = excPtr - 24;
 this.set_type = function(type) {
  HEAPU32[this.ptr + 4 >> 2] = type;
 };
 this.get_type = function() {
  return HEAPU32[this.ptr + 4 >> 2];
 };
 this.set_destructor = function(destructor) {
  HEAPU32[this.ptr + 8 >> 2] = destructor;
 };
 this.get_destructor = function() {
  return HEAPU32[this.ptr + 8 >> 2];
 };
 this.set_caught = function(caught) {
  caught = caught ? 1 : 0;
  HEAP8[this.ptr + 12 >> 0] = caught;
 };
 this.get_caught = function() {
  return HEAP8[this.ptr + 12 >> 0] != 0;
 };
 this.set_rethrown = function(rethrown) {
  rethrown = rethrown ? 1 : 0;
  HEAP8[this.ptr + 13 >> 0] = rethrown;
 };
 this.get_rethrown = function() {
  return HEAP8[this.ptr + 13 >> 0] != 0;
 };
 this.init = function(type, destructor) {
  this.set_adjusted_ptr(0);
  this.set_type(type);
  this.set_destructor(destructor);
 };
 this.set_adjusted_ptr = function(adjustedPtr) {
  HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
 };
 this.get_adjusted_ptr = function() {
  return HEAPU32[this.ptr + 16 >> 2];
 };
 this.get_exception_ptr = function() {
  var isPointer = ___cxa_is_pointer_type(this.get_type());
  if (isPointer) {
   return HEAPU32[this.excPtr >> 2];
  }
  var adjusted = this.get_adjusted_ptr();
  if (adjusted !== 0) return adjusted;
  return this.excPtr;
 };
}

function ___resumeException(ptr) {
 if (!exceptionLast) {
  exceptionLast = ptr;
 }
 throw exceptionLast;
}

function ___cxa_find_matching_catch() {
 var thrown = exceptionLast;
 if (!thrown) {
  setTempRet0(0);
  return 0;
 }
 var info = new ExceptionInfo(thrown);
 info.set_adjusted_ptr(thrown);
 var thrownType = info.get_type();
 if (!thrownType) {
  setTempRet0(0);
  return thrown;
 }
 for (var i = 0; i < arguments.length; i++) {
  var caughtType = arguments[i];
  if (caughtType === 0 || caughtType === thrownType) {
   break;
  }
  var adjusted_ptr_addr = info.ptr + 16;
  if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
   setTempRet0(caughtType);
   return thrown;
  }
 }
 setTempRet0(thrownType);
 return thrown;
}

var ___cxa_find_matching_catch_2 = ___cxa_find_matching_catch;

var uncaughtExceptionCount = 0;

function ___cxa_throw(ptr, type, destructor) {
 var info = new ExceptionInfo(ptr);
 info.init(type, destructor);
 exceptionLast = ptr;
 uncaughtExceptionCount++;
 throw exceptionLast;
}

var setErrNo = value => {
 HEAP32[___errno_location() >> 2] = value;
 return value;
};

function ___syscall_fcntl64(fd, cmd, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  switch (cmd) {
  case 0:
   {
    var arg = SYSCALLS.get();
    if (arg < 0) {
     return -28;
    }
    var newStream;
    newStream = FS.createStream(stream, arg);
    return newStream.fd;
   }

  case 1:
  case 2:
   return 0;

  case 3:
   return stream.flags;

  case 4:
   {
    var arg = SYSCALLS.get();
    stream.flags |= arg;
    return 0;
   }

  case 5:
   {
    var arg = SYSCALLS.get();
    var offset = 0;
    HEAP16[arg + offset >> 1] = 2;
    return 0;
   }

  case 6:
  case 7:
   return 0;

  case 16:
  case 8:
   return -28;

  case 9:
   setErrNo(28);
   return -1;

  default:
   {
    return -28;
   }
  }
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_ioctl(fd, op, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  switch (op) {
  case 21509:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21505:
   {
    if (!stream.tty) return -59;
    if (stream.tty.ops.ioctl_tcgets) {
     var termios = stream.tty.ops.ioctl_tcgets(stream);
     var argp = SYSCALLS.get();
     HEAP32[argp >> 2] = termios.c_iflag || 0;
     HEAP32[argp + 4 >> 2] = termios.c_oflag || 0;
     HEAP32[argp + 8 >> 2] = termios.c_cflag || 0;
     HEAP32[argp + 12 >> 2] = termios.c_lflag || 0;
     for (var i = 0; i < 32; i++) {
      HEAP8[argp + i + 17 >> 0] = termios.c_cc[i] || 0;
     }
     return 0;
    }
    return 0;
   }

  case 21510:
  case 21511:
  case 21512:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21506:
  case 21507:
  case 21508:
   {
    if (!stream.tty) return -59;
    if (stream.tty.ops.ioctl_tcsets) {
     var argp = SYSCALLS.get();
     var c_iflag = HEAP32[argp >> 2];
     var c_oflag = HEAP32[argp + 4 >> 2];
     var c_cflag = HEAP32[argp + 8 >> 2];
     var c_lflag = HEAP32[argp + 12 >> 2];
     var c_cc = [];
     for (var i = 0; i < 32; i++) {
      c_cc.push(HEAP8[argp + i + 17 >> 0]);
     }
     return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
      c_iflag: c_iflag,
      c_oflag: c_oflag,
      c_cflag: c_cflag,
      c_lflag: c_lflag,
      c_cc: c_cc
     });
    }
    return 0;
   }

  case 21519:
   {
    if (!stream.tty) return -59;
    var argp = SYSCALLS.get();
    HEAP32[argp >> 2] = 0;
    return 0;
   }

  case 21520:
   {
    if (!stream.tty) return -59;
    return -28;
   }

  case 21531:
   {
    var argp = SYSCALLS.get();
    return FS.ioctl(stream, op, argp);
   }

  case 21523:
   {
    if (!stream.tty) return -59;
    if (stream.tty.ops.ioctl_tiocgwinsz) {
     var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
     var argp = SYSCALLS.get();
     HEAP16[argp >> 1] = winsize[0];
     HEAP16[argp + 2 >> 1] = winsize[1];
    }
    return 0;
   }

  case 21524:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21515:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  default:
   return -28;
  }
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_openat(dirfd, path, flags, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  var mode = varargs ? SYSCALLS.get() : 0;
  return FS.open(path, flags, mode).fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {}

function getShiftFromSize(size) {
 switch (size) {
 case 1:
  return 0;

 case 2:
  return 1;

 case 4:
  return 2;

 case 8:
  return 3;

 default:
  throw new TypeError(`Unknown type size: ${size}`);
 }
}

function embind_init_charCodes() {
 var codes = new Array(256);
 for (var i = 0; i < 256; ++i) {
  codes[i] = String.fromCharCode(i);
 }
 embind_charCodes = codes;
}

var embind_charCodes = undefined;

function readLatin1String(ptr) {
 var ret = "";
 var c = ptr;
 while (HEAPU8[c]) {
  ret += embind_charCodes[HEAPU8[c++]];
 }
 return ret;
}

var awaitingDependencies = {};

var registeredTypes = {};

var typeDependencies = {};

var char_0 = 48;

var char_9 = 57;

function makeLegalFunctionName(name) {
 if (undefined === name) {
  return "_unknown";
 }
 name = name.replace(/[^a-zA-Z0-9_]/g, "$");
 var f = name.charCodeAt(0);
 if (f >= char_0 && f <= char_9) {
  return `_${name}`;
 }
 return name;
}

function createNamedFunction(name, body) {
 name = makeLegalFunctionName(name);
 return {
  [name]: function() {
   return body.apply(this, arguments);
  }
 }[name];
}

function extendError(baseErrorType, errorName) {
 var errorClass = createNamedFunction(errorName, function(message) {
  this.name = errorName;
  this.message = message;
  var stack = new Error(message).stack;
  if (stack !== undefined) {
   this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
  }
 });
 errorClass.prototype = Object.create(baseErrorType.prototype);
 errorClass.prototype.constructor = errorClass;
 errorClass.prototype.toString = function() {
  if (this.message === undefined) {
   return this.name;
  } else {
   return `${this.name}: ${this.message}`;
  }
 };
 return errorClass;
}

var BindingError = undefined;

function throwBindingError(message) {
 throw new BindingError(message);
}

var InternalError = undefined;

function registerType(rawType, registeredInstance, options = {}) {
 if (!("argPackAdvance" in registeredInstance)) {
  throw new TypeError("registerType registeredInstance requires argPackAdvance");
 }
 var name = registeredInstance.name;
 if (!rawType) {
  throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
 }
 if (registeredTypes.hasOwnProperty(rawType)) {
  if (options.ignoreDuplicateRegistrations) {
   return;
  } else {
   throwBindingError(`Cannot register type '${name}' twice`);
  }
 }
 registeredTypes[rawType] = registeredInstance;
 delete typeDependencies[rawType];
 if (awaitingDependencies.hasOwnProperty(rawType)) {
  var callbacks = awaitingDependencies[rawType];
  delete awaitingDependencies[rawType];
  callbacks.forEach(cb => cb());
 }
}

function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
 var shift = getShiftFromSize(size);
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": function(wt) {
   return !!wt;
  },
  "toWireType": function(destructors, o) {
   return o ? trueValue : falseValue;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": function(pointer) {
   var heap;
   if (size === 1) {
    heap = HEAP8;
   } else if (size === 2) {
    heap = HEAP16;
   } else if (size === 4) {
    heap = HEAP32;
   } else {
    throw new TypeError("Unknown boolean type size: " + name);
   }
   return this["fromWireType"](heap[pointer >> shift]);
  },
  destructorFunction: null
 });
}

function HandleAllocator() {
 this.allocated = [ undefined ];
 this.freelist = [];
 this.get = function(id) {
  return this.allocated[id];
 };
 this.has = function(id) {
  return this.allocated[id] !== undefined;
 };
 this.allocate = function(handle) {
  var id = this.freelist.pop() || this.allocated.length;
  this.allocated[id] = handle;
  return id;
 };
 this.free = function(id) {
  this.allocated[id] = undefined;
  this.freelist.push(id);
 };
}

var emval_handles = new HandleAllocator();

function __emval_decref(handle) {
 if (handle >= emval_handles.reserved && 0 === --emval_handles.get(handle).refcount) {
  emval_handles.free(handle);
 }
}

function count_emval_handles() {
 var count = 0;
 for (var i = emval_handles.reserved; i < emval_handles.allocated.length; ++i) {
  if (emval_handles.allocated[i] !== undefined) {
   ++count;
  }
 }
 return count;
}

function init_emval() {
 emval_handles.allocated.push({
  value: undefined
 }, {
  value: null
 }, {
  value: true
 }, {
  value: false
 });
 emval_handles.reserved = emval_handles.allocated.length;
 Module["count_emval_handles"] = count_emval_handles;
}

var Emval = {
 toValue: handle => {
  if (!handle) {
   throwBindingError("Cannot use deleted val. handle = " + handle);
  }
  return emval_handles.get(handle).value;
 },
 toHandle: value => {
  switch (value) {
  case undefined:
   return 1;

  case null:
   return 2;

  case true:
   return 3;

  case false:
   return 4;

  default:
   {
    return emval_handles.allocate({
     refcount: 1,
     value: value
    });
   }
  }
 }
};

function simpleReadValueFromPointer(pointer) {
 return this["fromWireType"](HEAP32[pointer >> 2]);
}

function __embind_register_emval(rawType, name) {
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": function(handle) {
   var rv = Emval.toValue(handle);
   __emval_decref(handle);
   return rv;
  },
  "toWireType": function(destructors, value) {
   return Emval.toHandle(value);
  },
  "argPackAdvance": 8,
  "readValueFromPointer": simpleReadValueFromPointer,
  destructorFunction: null
 });
}

function floatReadValueFromPointer(name, shift) {
 switch (shift) {
 case 2:
  return function(pointer) {
   return this["fromWireType"](HEAPF32[pointer >> 2]);
  };

 case 3:
  return function(pointer) {
   return this["fromWireType"](HEAPF64[pointer >> 3]);
  };

 default:
  throw new TypeError("Unknown float type: " + name);
 }
}

function __embind_register_float(rawType, name, size) {
 var shift = getShiftFromSize(size);
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": function(value) {
   return value;
  },
  "toWireType": function(destructors, value) {
   return value;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": floatReadValueFromPointer(name, shift),
  destructorFunction: null
 });
}

function integerReadValueFromPointer(name, shift, signed) {
 switch (shift) {
 case 0:
  return signed ? function readS8FromPointer(pointer) {
   return HEAP8[pointer];
  } : function readU8FromPointer(pointer) {
   return HEAPU8[pointer];
  };

 case 1:
  return signed ? function readS16FromPointer(pointer) {
   return HEAP16[pointer >> 1];
  } : function readU16FromPointer(pointer) {
   return HEAPU16[pointer >> 1];
  };

 case 2:
  return signed ? function readS32FromPointer(pointer) {
   return HEAP32[pointer >> 2];
  } : function readU32FromPointer(pointer) {
   return HEAPU32[pointer >> 2];
  };

 default:
  throw new TypeError("Unknown integer type: " + name);
 }
}

function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
 name = readLatin1String(name);
 if (maxRange === -1) {
  maxRange = 4294967295;
 }
 var shift = getShiftFromSize(size);
 var fromWireType = value => value;
 if (minRange === 0) {
  var bitshift = 32 - 8 * size;
  fromWireType = value => value << bitshift >>> bitshift;
 }
 var isUnsignedType = name.includes("unsigned");
 var checkAssertions = (value, toTypeName) => {};
 var toWireType;
 if (isUnsignedType) {
  toWireType = function(destructors, value) {
   checkAssertions(value, this.name);
   return value >>> 0;
  };
 } else {
  toWireType = function(destructors, value) {
   checkAssertions(value, this.name);
   return value;
  };
 }
 registerType(primitiveType, {
  name: name,
  "fromWireType": fromWireType,
  "toWireType": toWireType,
  "argPackAdvance": 8,
  "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0),
  destructorFunction: null
 });
}

function __embind_register_memory_view(rawType, dataTypeIndex, name) {
 var typeMapping = [ Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array ];
 var TA = typeMapping[dataTypeIndex];
 function decodeMemoryView(handle) {
  handle = handle >> 2;
  var heap = HEAPU32;
  var size = heap[handle];
  var data = heap[handle + 1];
  return new TA(heap.buffer, data, size);
 }
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": decodeMemoryView,
  "argPackAdvance": 8,
  "readValueFromPointer": decodeMemoryView
 }, {
  ignoreDuplicateRegistrations: true
 });
}

var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
 return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
};

function __embind_register_std_string(rawType, name) {
 name = readLatin1String(name);
 var stdStringIsUTF8 = name === "std::string";
 registerType(rawType, {
  name: name,
  "fromWireType": function(value) {
   var length = HEAPU32[value >> 2];
   var payload = value + 4;
   var str;
   if (stdStringIsUTF8) {
    var decodeStartPtr = payload;
    for (var i = 0; i <= length; ++i) {
     var currentBytePtr = payload + i;
     if (i == length || HEAPU8[currentBytePtr] == 0) {
      var maxRead = currentBytePtr - decodeStartPtr;
      var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
      if (str === undefined) {
       str = stringSegment;
      } else {
       str += String.fromCharCode(0);
       str += stringSegment;
      }
      decodeStartPtr = currentBytePtr + 1;
     }
    }
   } else {
    var a = new Array(length);
    for (var i = 0; i < length; ++i) {
     a[i] = String.fromCharCode(HEAPU8[payload + i]);
    }
    str = a.join("");
   }
   _free(value);
   return str;
  },
  "toWireType": function(destructors, value) {
   if (value instanceof ArrayBuffer) {
    value = new Uint8Array(value);
   }
   var length;
   var valueIsOfTypeString = typeof value == "string";
   if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
    throwBindingError("Cannot pass non-string to std::string");
   }
   if (stdStringIsUTF8 && valueIsOfTypeString) {
    length = lengthBytesUTF8(value);
   } else {
    length = value.length;
   }
   var base = _malloc(4 + length + 1);
   var ptr = base + 4;
   HEAPU32[base >> 2] = length;
   if (stdStringIsUTF8 && valueIsOfTypeString) {
    stringToUTF8(value, ptr, length + 1);
   } else {
    if (valueIsOfTypeString) {
     for (var i = 0; i < length; ++i) {
      var charCode = value.charCodeAt(i);
      if (charCode > 255) {
       _free(ptr);
       throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
      }
      HEAPU8[ptr + i] = charCode;
     }
    } else {
     for (var i = 0; i < length; ++i) {
      HEAPU8[ptr + i] = value[i];
     }
    }
   }
   if (destructors !== null) {
    destructors.push(_free, base);
   }
   return base;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": simpleReadValueFromPointer,
  destructorFunction: function(ptr) {
   _free(ptr);
  }
 });
}

var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : undefined;

var UTF16ToString = (ptr, maxBytesToRead) => {
 var endPtr = ptr;
 var idx = endPtr >> 1;
 var maxIdx = idx + maxBytesToRead / 2;
 while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
 endPtr = idx << 1;
 if (endPtr - ptr > 32 && UTF16Decoder) return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
 var str = "";
 for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
  var codeUnit = HEAP16[ptr + i * 2 >> 1];
  if (codeUnit == 0) break;
  str += String.fromCharCode(codeUnit);
 }
 return str;
};

var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
 if (maxBytesToWrite === undefined) {
  maxBytesToWrite = 2147483647;
 }
 if (maxBytesToWrite < 2) return 0;
 maxBytesToWrite -= 2;
 var startPtr = outPtr;
 var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
 for (var i = 0; i < numCharsToWrite; ++i) {
  var codeUnit = str.charCodeAt(i);
  HEAP16[outPtr >> 1] = codeUnit;
  outPtr += 2;
 }
 HEAP16[outPtr >> 1] = 0;
 return outPtr - startPtr;
};

var lengthBytesUTF16 = str => {
 return str.length * 2;
};

var UTF32ToString = (ptr, maxBytesToRead) => {
 var i = 0;
 var str = "";
 while (!(i >= maxBytesToRead / 4)) {
  var utf32 = HEAP32[ptr + i * 4 >> 2];
  if (utf32 == 0) break;
  ++i;
  if (utf32 >= 65536) {
   var ch = utf32 - 65536;
   str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
  } else {
   str += String.fromCharCode(utf32);
  }
 }
 return str;
};

var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
 if (maxBytesToWrite === undefined) {
  maxBytesToWrite = 2147483647;
 }
 if (maxBytesToWrite < 4) return 0;
 var startPtr = outPtr;
 var endPtr = startPtr + maxBytesToWrite - 4;
 for (var i = 0; i < str.length; ++i) {
  var codeUnit = str.charCodeAt(i);
  if (codeUnit >= 55296 && codeUnit <= 57343) {
   var trailSurrogate = str.charCodeAt(++i);
   codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
  }
  HEAP32[outPtr >> 2] = codeUnit;
  outPtr += 4;
  if (outPtr + 4 > endPtr) break;
 }
 HEAP32[outPtr >> 2] = 0;
 return outPtr - startPtr;
};

var lengthBytesUTF32 = str => {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var codeUnit = str.charCodeAt(i);
  if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
  len += 4;
 }
 return len;
};

var __embind_register_std_wstring = function(rawType, charSize, name) {
 name = readLatin1String(name);
 var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
 if (charSize === 2) {
  decodeString = UTF16ToString;
  encodeString = stringToUTF16;
  lengthBytesUTF = lengthBytesUTF16;
  getHeap = () => HEAPU16;
  shift = 1;
 } else if (charSize === 4) {
  decodeString = UTF32ToString;
  encodeString = stringToUTF32;
  lengthBytesUTF = lengthBytesUTF32;
  getHeap = () => HEAPU32;
  shift = 2;
 }
 registerType(rawType, {
  name: name,
  "fromWireType": function(value) {
   var length = HEAPU32[value >> 2];
   var HEAP = getHeap();
   var str;
   var decodeStartPtr = value + 4;
   for (var i = 0; i <= length; ++i) {
    var currentBytePtr = value + 4 + i * charSize;
    if (i == length || HEAP[currentBytePtr >> shift] == 0) {
     var maxReadBytes = currentBytePtr - decodeStartPtr;
     var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
     if (str === undefined) {
      str = stringSegment;
     } else {
      str += String.fromCharCode(0);
      str += stringSegment;
     }
     decodeStartPtr = currentBytePtr + charSize;
    }
   }
   _free(value);
   return str;
  },
  "toWireType": function(destructors, value) {
   if (!(typeof value == "string")) {
    throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
   }
   var length = lengthBytesUTF(value);
   var ptr = _malloc(4 + length + charSize);
   HEAPU32[ptr >> 2] = length >> shift;
   encodeString(value, ptr + 4, length + charSize);
   if (destructors !== null) {
    destructors.push(_free, ptr);
   }
   return ptr;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": simpleReadValueFromPointer,
  destructorFunction: function(ptr) {
   _free(ptr);
  }
 });
};

function __embind_register_void(rawType, name) {
 name = readLatin1String(name);
 registerType(rawType, {
  isVoid: true,
  name: name,
  "argPackAdvance": 0,
  "fromWireType": function() {
   return undefined;
  },
  "toWireType": function(destructors, o) {
   return undefined;
  }
 });
}

function __emscripten_fetch_free(id) {
 if (Fetch.xhrs.has(id)) {
  var xhr = Fetch.xhrs.get(id);
  Fetch.xhrs.free(id);
  if (xhr.readyState > 0 && xhr.readyState < 4) {
   xhr.abort();
  }
 }
}

var __emscripten_throw_longjmp = () => {
 throw Infinity;
};

function readI53FromI64(ptr) {
 return HEAPU32[ptr >> 2] + HEAP32[ptr + 4 >> 2] * 4294967296;
}

var isLeapYear = year => {
 return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

var MONTH_DAYS_LEAP_CUMULATIVE = [ 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335 ];

var MONTH_DAYS_REGULAR_CUMULATIVE = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

var ydayFromDate = date => {
 var leap = isLeapYear(date.getFullYear());
 var monthDaysCumulative = leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE;
 var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
 return yday;
};

var __localtime_js = (time, tmPtr) => {
 var date = new Date(readI53FromI64(time) * 1e3);
 HEAP32[tmPtr >> 2] = date.getSeconds();
 HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
 HEAP32[tmPtr + 8 >> 2] = date.getHours();
 HEAP32[tmPtr + 12 >> 2] = date.getDate();
 HEAP32[tmPtr + 16 >> 2] = date.getMonth();
 HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
 HEAP32[tmPtr + 24 >> 2] = date.getDay();
 var yday = ydayFromDate(date) | 0;
 HEAP32[tmPtr + 28 >> 2] = yday;
 HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
 var start = new Date(date.getFullYear(), 0, 1);
 var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
 var winterOffset = start.getTimezoneOffset();
 var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
 HEAP32[tmPtr + 32 >> 2] = dst;
};

var stringToNewUTF8 = str => {
 var size = lengthBytesUTF8(str) + 1;
 var ret = _malloc(size);
 if (ret) stringToUTF8(str, ret, size);
 return ret;
};

var __tzset_js = (timezone, daylight, tzname) => {
 var currentYear = new Date().getFullYear();
 var winter = new Date(currentYear, 0, 1);
 var summer = new Date(currentYear, 6, 1);
 var winterOffset = winter.getTimezoneOffset();
 var summerOffset = summer.getTimezoneOffset();
 var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
 HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
 HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
 function extractZone(date) {
  var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
  return match ? match[1] : "GMT";
 }
 var winterName = extractZone(winter);
 var summerName = extractZone(summer);
 var winterNamePtr = stringToNewUTF8(winterName);
 var summerNamePtr = stringToNewUTF8(summerName);
 if (summerOffset < winterOffset) {
  HEAPU32[tzname >> 2] = winterNamePtr;
  HEAPU32[tzname + 4 >> 2] = summerNamePtr;
 } else {
  HEAPU32[tzname >> 2] = summerNamePtr;
  HEAPU32[tzname + 4 >> 2] = winterNamePtr;
 }
};

var _abort = () => {
 abort("");
};

var AL = {
 QUEUE_INTERVAL: 25,
 QUEUE_LOOKAHEAD: .1,
 DEVICE_NAME: "Emscripten OpenAL",
 CAPTURE_DEVICE_NAME: "Emscripten OpenAL capture",
 ALC_EXTENSIONS: {
  ALC_SOFT_pause_device: true,
  ALC_SOFT_HRTF: true
 },
 AL_EXTENSIONS: {
  AL_EXT_float32: true,
  AL_SOFT_loop_points: true,
  AL_SOFT_source_length: true,
  AL_EXT_source_distance_model: true,
  AL_SOFT_source_spatialize: true
 },
 _alcErr: 0,
 alcErr: 0,
 deviceRefCounts: {},
 alcStringCache: {},
 paused: false,
 stringCache: {},
 contexts: {},
 currentCtx: null,
 buffers: {
  0: {
   id: 0,
   refCount: 0,
   audioBuf: null,
   frequency: 0,
   bytesPerSample: 2,
   channels: 1,
   length: 0
  }
 },
 paramArray: [],
 _nextId: 1,
 newId: function() {
  return AL.freeIds.length > 0 ? AL.freeIds.pop() : AL._nextId++;
 },
 freeIds: [],
 scheduleContextAudio: function(ctx) {
  if (Browser.mainLoop.timingMode === 1 && document["visibilityState"] != "visible") {
   return;
  }
  for (var i in ctx.sources) {
   AL.scheduleSourceAudio(ctx.sources[i]);
  }
 },
 scheduleSourceAudio: function(src, lookahead) {
  if (Browser.mainLoop.timingMode === 1 && document["visibilityState"] != "visible") {
   return;
  }
  if (src.state !== 4114) {
   return;
  }
  var currentTime = AL.updateSourceTime(src);
  var startTime = src.bufStartTime;
  var startOffset = src.bufOffset;
  var bufCursor = src.bufsProcessed;
  for (var i = 0; i < src.audioQueue.length; i++) {
   var audioSrc = src.audioQueue[i];
   startTime = audioSrc._startTime + audioSrc._duration;
   startOffset = 0;
   bufCursor += audioSrc._skipCount + 1;
  }
  if (!lookahead) {
   lookahead = AL.QUEUE_LOOKAHEAD;
  }
  var lookaheadTime = currentTime + lookahead;
  var skipCount = 0;
  while (startTime < lookaheadTime) {
   if (bufCursor >= src.bufQueue.length) {
    if (src.looping) {
     bufCursor %= src.bufQueue.length;
    } else {
     break;
    }
   }
   var buf = src.bufQueue[bufCursor % src.bufQueue.length];
   if (buf.length === 0) {
    skipCount++;
    if (skipCount === src.bufQueue.length) {
     break;
    }
   } else {
    var audioSrc = src.context.audioCtx.createBufferSource();
    audioSrc.buffer = buf.audioBuf;
    audioSrc.playbackRate.value = src.playbackRate;
    if (buf.audioBuf._loopStart || buf.audioBuf._loopEnd) {
     audioSrc.loopStart = buf.audioBuf._loopStart;
     audioSrc.loopEnd = buf.audioBuf._loopEnd;
    }
    var duration = 0;
    if (src.type === 4136 && src.looping) {
     duration = Number.POSITIVE_INFINITY;
     audioSrc.loop = true;
     if (buf.audioBuf._loopStart) {
      audioSrc.loopStart = buf.audioBuf._loopStart;
     }
     if (buf.audioBuf._loopEnd) {
      audioSrc.loopEnd = buf.audioBuf._loopEnd;
     }
    } else {
     duration = (buf.audioBuf.duration - startOffset) / src.playbackRate;
    }
    audioSrc._startOffset = startOffset;
    audioSrc._duration = duration;
    audioSrc._skipCount = skipCount;
    skipCount = 0;
    audioSrc.connect(src.gain);
    if (typeof audioSrc.start != "undefined") {
     startTime = Math.max(startTime, src.context.audioCtx.currentTime);
     audioSrc.start(startTime, startOffset);
    } else if (typeof audioSrc.noteOn != "undefined") {
     startTime = Math.max(startTime, src.context.audioCtx.currentTime);
     audioSrc.noteOn(startTime);
    }
    audioSrc._startTime = startTime;
    src.audioQueue.push(audioSrc);
    startTime += duration;
   }
   startOffset = 0;
   bufCursor++;
  }
 },
 updateSourceTime: function(src) {
  var currentTime = src.context.audioCtx.currentTime;
  if (src.state !== 4114) {
   return currentTime;
  }
  if (!isFinite(src.bufStartTime)) {
   src.bufStartTime = currentTime - src.bufOffset / src.playbackRate;
   src.bufOffset = 0;
  }
  var nextStartTime = 0;
  while (src.audioQueue.length) {
   var audioSrc = src.audioQueue[0];
   src.bufsProcessed += audioSrc._skipCount;
   nextStartTime = audioSrc._startTime + audioSrc._duration;
   if (currentTime < nextStartTime) {
    break;
   }
   src.audioQueue.shift();
   src.bufStartTime = nextStartTime;
   src.bufOffset = 0;
   src.bufsProcessed++;
  }
  if (src.bufsProcessed >= src.bufQueue.length && !src.looping) {
   AL.setSourceState(src, 4116);
  } else if (src.type === 4136 && src.looping) {
   var buf = src.bufQueue[0];
   if (buf.length === 0) {
    src.bufOffset = 0;
   } else {
    var delta = (currentTime - src.bufStartTime) * src.playbackRate;
    var loopStart = buf.audioBuf._loopStart || 0;
    var loopEnd = buf.audioBuf._loopEnd || buf.audioBuf.duration;
    if (loopEnd <= loopStart) {
     loopEnd = buf.audioBuf.duration;
    }
    if (delta < loopEnd) {
     src.bufOffset = delta;
    } else {
     src.bufOffset = loopStart + (delta - loopStart) % (loopEnd - loopStart);
    }
   }
  } else if (src.audioQueue[0]) {
   src.bufOffset = (currentTime - src.audioQueue[0]._startTime) * src.playbackRate;
  } else {
   if (src.type !== 4136 && src.looping) {
    var srcDuration = AL.sourceDuration(src) / src.playbackRate;
    if (srcDuration > 0) {
     src.bufStartTime += Math.floor((currentTime - src.bufStartTime) / srcDuration) * srcDuration;
    }
   }
   for (var i = 0; i < src.bufQueue.length; i++) {
    if (src.bufsProcessed >= src.bufQueue.length) {
     if (src.looping) {
      src.bufsProcessed %= src.bufQueue.length;
     } else {
      AL.setSourceState(src, 4116);
      break;
     }
    }
    var buf = src.bufQueue[src.bufsProcessed];
    if (buf.length > 0) {
     nextStartTime = src.bufStartTime + buf.audioBuf.duration / src.playbackRate;
     if (currentTime < nextStartTime) {
      src.bufOffset = (currentTime - src.bufStartTime) * src.playbackRate;
      break;
     }
     src.bufStartTime = nextStartTime;
    }
    src.bufOffset = 0;
    src.bufsProcessed++;
   }
  }
  return currentTime;
 },
 cancelPendingSourceAudio: function(src) {
  AL.updateSourceTime(src);
  for (var i = 1; i < src.audioQueue.length; i++) {
   var audioSrc = src.audioQueue[i];
   audioSrc.stop();
  }
  if (src.audioQueue.length > 1) {
   src.audioQueue.length = 1;
  }
 },
 stopSourceAudio: function(src) {
  for (var i = 0; i < src.audioQueue.length; i++) {
   src.audioQueue[i].stop();
  }
  src.audioQueue.length = 0;
 },
 setSourceState: function(src, state) {
  if (state === 4114) {
   if (src.state === 4114 || src.state == 4116) {
    src.bufsProcessed = 0;
    src.bufOffset = 0;
   } else {}
   AL.stopSourceAudio(src);
   src.state = 4114;
   src.bufStartTime = Number.NEGATIVE_INFINITY;
   AL.scheduleSourceAudio(src);
  } else if (state === 4115) {
   if (src.state === 4114) {
    AL.updateSourceTime(src);
    AL.stopSourceAudio(src);
    src.state = 4115;
   }
  } else if (state === 4116) {
   if (src.state !== 4113) {
    src.state = 4116;
    src.bufsProcessed = src.bufQueue.length;
    src.bufStartTime = Number.NEGATIVE_INFINITY;
    src.bufOffset = 0;
    AL.stopSourceAudio(src);
   }
  } else if (state === 4113) {
   if (src.state !== 4113) {
    src.state = 4113;
    src.bufsProcessed = 0;
    src.bufStartTime = Number.NEGATIVE_INFINITY;
    src.bufOffset = 0;
    AL.stopSourceAudio(src);
   }
  }
 },
 initSourcePanner: function(src) {
  if (src.type === 4144) {
   return;
  }
  var templateBuf = AL.buffers[0];
  for (var i = 0; i < src.bufQueue.length; i++) {
   if (src.bufQueue[i].id !== 0) {
    templateBuf = src.bufQueue[i];
    break;
   }
  }
  if (src.spatialize === 1 || src.spatialize === 2 && templateBuf.channels === 1) {
   if (src.panner) {
    return;
   }
   src.panner = src.context.audioCtx.createPanner();
   AL.updateSourceGlobal(src);
   AL.updateSourceSpace(src);
   src.panner.connect(src.context.gain);
   src.gain.disconnect();
   src.gain.connect(src.panner);
  } else {
   if (!src.panner) {
    return;
   }
   src.panner.disconnect();
   src.gain.disconnect();
   src.gain.connect(src.context.gain);
   src.panner = null;
  }
 },
 updateContextGlobal: function(ctx) {
  for (var i in ctx.sources) {
   AL.updateSourceGlobal(ctx.sources[i]);
  }
 },
 updateSourceGlobal: function(src) {
  var panner = src.panner;
  if (!panner) {
   return;
  }
  panner.refDistance = src.refDistance;
  panner.maxDistance = src.maxDistance;
  panner.rolloffFactor = src.rolloffFactor;
  panner.panningModel = src.context.hrtf ? "HRTF" : "equalpower";
  var distanceModel = src.context.sourceDistanceModel ? src.distanceModel : src.context.distanceModel;
  switch (distanceModel) {
  case 0:
   panner.distanceModel = "inverse";
   panner.refDistance = 340282e33;
   break;

  case 53249:
  case 53250:
   panner.distanceModel = "inverse";
   break;

  case 53251:
  case 53252:
   panner.distanceModel = "linear";
   break;

  case 53253:
  case 53254:
   panner.distanceModel = "exponential";
   break;
  }
 },
 updateListenerSpace: function(ctx) {
  var listener = ctx.audioCtx.listener;
  if (listener.positionX) {
   listener.positionX.value = ctx.listener.position[0];
   listener.positionY.value = ctx.listener.position[1];
   listener.positionZ.value = ctx.listener.position[2];
  } else {
   listener.setPosition(ctx.listener.position[0], ctx.listener.position[1], ctx.listener.position[2]);
  }
  if (listener.forwardX) {
   listener.forwardX.value = ctx.listener.direction[0];
   listener.forwardY.value = ctx.listener.direction[1];
   listener.forwardZ.value = ctx.listener.direction[2];
   listener.upX.value = ctx.listener.up[0];
   listener.upY.value = ctx.listener.up[1];
   listener.upZ.value = ctx.listener.up[2];
  } else {
   listener.setOrientation(ctx.listener.direction[0], ctx.listener.direction[1], ctx.listener.direction[2], ctx.listener.up[0], ctx.listener.up[1], ctx.listener.up[2]);
  }
  for (var i in ctx.sources) {
   AL.updateSourceSpace(ctx.sources[i]);
  }
 },
 updateSourceSpace: function(src) {
  if (!src.panner) {
   return;
  }
  var panner = src.panner;
  var posX = src.position[0];
  var posY = src.position[1];
  var posZ = src.position[2];
  var dirX = src.direction[0];
  var dirY = src.direction[1];
  var dirZ = src.direction[2];
  var listener = src.context.listener;
  var lPosX = listener.position[0];
  var lPosY = listener.position[1];
  var lPosZ = listener.position[2];
  if (src.relative) {
   var lBackX = -listener.direction[0];
   var lBackY = -listener.direction[1];
   var lBackZ = -listener.direction[2];
   var lUpX = listener.up[0];
   var lUpY = listener.up[1];
   var lUpZ = listener.up[2];
   var inverseMagnitude = (x, y, z) => {
    var length = Math.sqrt(x * x + y * y + z * z);
    if (length < Number.EPSILON) {
     return 0;
    }
    return 1 / length;
   };
   var invMag = inverseMagnitude(lBackX, lBackY, lBackZ);
   lBackX *= invMag;
   lBackY *= invMag;
   lBackZ *= invMag;
   invMag = inverseMagnitude(lUpX, lUpY, lUpZ);
   lUpX *= invMag;
   lUpY *= invMag;
   lUpZ *= invMag;
   var lRightX = lUpY * lBackZ - lUpZ * lBackY;
   var lRightY = lUpZ * lBackX - lUpX * lBackZ;
   var lRightZ = lUpX * lBackY - lUpY * lBackX;
   invMag = inverseMagnitude(lRightX, lRightY, lRightZ);
   lRightX *= invMag;
   lRightY *= invMag;
   lRightZ *= invMag;
   lUpX = lBackY * lRightZ - lBackZ * lRightY;
   lUpY = lBackZ * lRightX - lBackX * lRightZ;
   lUpZ = lBackX * lRightY - lBackY * lRightX;
   var oldX = dirX;
   var oldY = dirY;
   var oldZ = dirZ;
   dirX = oldX * lRightX + oldY * lUpX + oldZ * lBackX;
   dirY = oldX * lRightY + oldY * lUpY + oldZ * lBackY;
   dirZ = oldX * lRightZ + oldY * lUpZ + oldZ * lBackZ;
   oldX = posX;
   oldY = posY;
   oldZ = posZ;
   posX = oldX * lRightX + oldY * lUpX + oldZ * lBackX;
   posY = oldX * lRightY + oldY * lUpY + oldZ * lBackY;
   posZ = oldX * lRightZ + oldY * lUpZ + oldZ * lBackZ;
   posX += lPosX;
   posY += lPosY;
   posZ += lPosZ;
  }
  if (panner.positionX) {
   if (posX != panner.positionX.value) panner.positionX.value = posX;
   if (posY != panner.positionY.value) panner.positionY.value = posY;
   if (posZ != panner.positionZ.value) panner.positionZ.value = posZ;
  } else {
   panner.setPosition(posX, posY, posZ);
  }
  if (panner.orientationX) {
   if (dirX != panner.orientationX.value) panner.orientationX.value = dirX;
   if (dirY != panner.orientationY.value) panner.orientationY.value = dirY;
   if (dirZ != panner.orientationZ.value) panner.orientationZ.value = dirZ;
  } else {
   panner.setOrientation(dirX, dirY, dirZ);
  }
  var oldShift = src.dopplerShift;
  var velX = src.velocity[0];
  var velY = src.velocity[1];
  var velZ = src.velocity[2];
  var lVelX = listener.velocity[0];
  var lVelY = listener.velocity[1];
  var lVelZ = listener.velocity[2];
  if (posX === lPosX && posY === lPosY && posZ === lPosZ || velX === lVelX && velY === lVelY && velZ === lVelZ) {
   src.dopplerShift = 1;
  } else {
   var speedOfSound = src.context.speedOfSound;
   var dopplerFactor = src.context.dopplerFactor;
   var slX = lPosX - posX;
   var slY = lPosY - posY;
   var slZ = lPosZ - posZ;
   var magSl = Math.sqrt(slX * slX + slY * slY + slZ * slZ);
   var vls = (slX * lVelX + slY * lVelY + slZ * lVelZ) / magSl;
   var vss = (slX * velX + slY * velY + slZ * velZ) / magSl;
   vls = Math.min(vls, speedOfSound / dopplerFactor);
   vss = Math.min(vss, speedOfSound / dopplerFactor);
   src.dopplerShift = (speedOfSound - dopplerFactor * vls) / (speedOfSound - dopplerFactor * vss);
  }
  if (src.dopplerShift !== oldShift) {
   AL.updateSourceRate(src);
  }
 },
 updateSourceRate: function(src) {
  if (src.state === 4114) {
   AL.cancelPendingSourceAudio(src);
   var audioSrc = src.audioQueue[0];
   if (!audioSrc) {
    return;
   }
   var duration;
   if (src.type === 4136 && src.looping) {
    duration = Number.POSITIVE_INFINITY;
   } else {
    duration = (audioSrc.buffer.duration - audioSrc._startOffset) / src.playbackRate;
   }
   audioSrc._duration = duration;
   audioSrc.playbackRate.value = src.playbackRate;
   AL.scheduleSourceAudio(src);
  }
 },
 sourceDuration: function(src) {
  var length = 0;
  for (var i = 0; i < src.bufQueue.length; i++) {
   var audioBuf = src.bufQueue[i].audioBuf;
   length += audioBuf ? audioBuf.duration : 0;
  }
  return length;
 },
 sourceTell: function(src) {
  AL.updateSourceTime(src);
  var offset = 0;
  for (var i = 0; i < src.bufsProcessed; i++) {
   if (src.bufQueue[i].audioBuf) {
    offset += src.bufQueue[i].audioBuf.duration;
   }
  }
  offset += src.bufOffset;
  return offset;
 },
 sourceSeek: function(src, offset) {
  var playing = src.state == 4114;
  if (playing) {
   AL.setSourceState(src, 4113);
  }
  if (src.bufQueue[src.bufsProcessed].audioBuf !== null) {
   src.bufsProcessed = 0;
   while (offset > src.bufQueue[src.bufsProcessed].audioBuf.duration) {
    offset -= src.bufQueue[src.bufsProcessed].audiobuf.duration;
    src.bufsProcessed++;
   }
   src.bufOffset = offset;
  }
  if (playing) {
   AL.setSourceState(src, 4114);
  }
 },
 getGlobalParam: function(funcname, param) {
  if (!AL.currentCtx) {
   return null;
  }
  switch (param) {
  case 49152:
   return AL.currentCtx.dopplerFactor;

  case 49155:
   return AL.currentCtx.speedOfSound;

  case 53248:
   return AL.currentCtx.distanceModel;

  default:
   AL.currentCtx.err = 40962;
   return null;
  }
 },
 setGlobalParam: function(funcname, param, value) {
  if (!AL.currentCtx) {
   return;
  }
  switch (param) {
  case 49152:
   if (!Number.isFinite(value) || value < 0) {
    AL.currentCtx.err = 40963;
    return;
   }
   AL.currentCtx.dopplerFactor = value;
   AL.updateListenerSpace(AL.currentCtx);
   break;

  case 49155:
   if (!Number.isFinite(value) || value <= 0) {
    AL.currentCtx.err = 40963;
    return;
   }
   AL.currentCtx.speedOfSound = value;
   AL.updateListenerSpace(AL.currentCtx);
   break;

  case 53248:
   switch (value) {
   case 0:
   case 53249:
   case 53250:
   case 53251:
   case 53252:
   case 53253:
   case 53254:
    AL.currentCtx.distanceModel = value;
    AL.updateContextGlobal(AL.currentCtx);
    break;

   default:
    AL.currentCtx.err = 40963;
    return;
   }
   break;

  default:
   AL.currentCtx.err = 40962;
   return;
  }
 },
 getListenerParam: function(funcname, param) {
  if (!AL.currentCtx) {
   return null;
  }
  switch (param) {
  case 4100:
   return AL.currentCtx.listener.position;

  case 4102:
   return AL.currentCtx.listener.velocity;

  case 4111:
   return AL.currentCtx.listener.direction.concat(AL.currentCtx.listener.up);

  case 4106:
   return AL.currentCtx.gain.gain.value;

  default:
   AL.currentCtx.err = 40962;
   return null;
  }
 },
 setListenerParam: function(funcname, param, value) {
  if (!AL.currentCtx) {
   return;
  }
  if (value === null) {
   AL.currentCtx.err = 40962;
   return;
  }
  var listener = AL.currentCtx.listener;
  switch (param) {
  case 4100:
   if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
    AL.currentCtx.err = 40963;
    return;
   }
   listener.position[0] = value[0];
   listener.position[1] = value[1];
   listener.position[2] = value[2];
   AL.updateListenerSpace(AL.currentCtx);
   break;

  case 4102:
   if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
    AL.currentCtx.err = 40963;
    return;
   }
   listener.velocity[0] = value[0];
   listener.velocity[1] = value[1];
   listener.velocity[2] = value[2];
   AL.updateListenerSpace(AL.currentCtx);
   break;

  case 4106:
   if (!Number.isFinite(value) || value < 0) {
    AL.currentCtx.err = 40963;
    return;
   }
   AL.currentCtx.gain.gain.value = value;
   break;

  case 4111:
   if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2]) || !Number.isFinite(value[3]) || !Number.isFinite(value[4]) || !Number.isFinite(value[5])) {
    AL.currentCtx.err = 40963;
    return;
   }
   listener.direction[0] = value[0];
   listener.direction[1] = value[1];
   listener.direction[2] = value[2];
   listener.up[0] = value[3];
   listener.up[1] = value[4];
   listener.up[2] = value[5];
   AL.updateListenerSpace(AL.currentCtx);
   break;

  default:
   AL.currentCtx.err = 40962;
   return;
  }
 },
 getBufferParam: function(funcname, bufferId, param) {
  if (!AL.currentCtx) {
   return;
  }
  var buf = AL.buffers[bufferId];
  if (!buf || bufferId === 0) {
   AL.currentCtx.err = 40961;
   return;
  }
  switch (param) {
  case 8193:
   return buf.frequency;

  case 8194:
   return buf.bytesPerSample * 8;

  case 8195:
   return buf.channels;

  case 8196:
   return buf.length * buf.bytesPerSample * buf.channels;

  case 8213:
   if (buf.length === 0) {
    return [ 0, 0 ];
   }
   return [ (buf.audioBuf._loopStart || 0) * buf.frequency, (buf.audioBuf._loopEnd || buf.length) * buf.frequency ];

  default:
   AL.currentCtx.err = 40962;
   return null;
  }
 },
 setBufferParam: function(funcname, bufferId, param, value) {
  if (!AL.currentCtx) {
   return;
  }
  var buf = AL.buffers[bufferId];
  if (!buf || bufferId === 0) {
   AL.currentCtx.err = 40961;
   return;
  }
  if (value === null) {
   AL.currentCtx.err = 40962;
   return;
  }
  switch (param) {
  case 8196:
   if (value !== 0) {
    AL.currentCtx.err = 40963;
    return;
   }
   break;

  case 8213:
   if (value[0] < 0 || value[0] > buf.length || value[1] < 0 || value[1] > buf.Length || value[0] >= value[1]) {
    AL.currentCtx.err = 40963;
    return;
   }
   if (buf.refCount > 0) {
    AL.currentCtx.err = 40964;
    return;
   }
   if (buf.audioBuf) {
    buf.audioBuf._loopStart = value[0] / buf.frequency;
    buf.audioBuf._loopEnd = value[1] / buf.frequency;
   }
   break;

  default:
   AL.currentCtx.err = 40962;
   return;
  }
 },
 getSourceParam: function(funcname, sourceId, param) {
  if (!AL.currentCtx) {
   return null;
  }
  var src = AL.currentCtx.sources[sourceId];
  if (!src) {
   AL.currentCtx.err = 40961;
   return null;
  }
  switch (param) {
  case 514:
   return src.relative;

  case 4097:
   return src.coneInnerAngle;

  case 4098:
   return src.coneOuterAngle;

  case 4099:
   return src.pitch;

  case 4100:
   return src.position;

  case 4101:
   return src.direction;

  case 4102:
   return src.velocity;

  case 4103:
   return src.looping;

  case 4105:
   if (src.type === 4136) {
    return src.bufQueue[0].id;
   }
   return 0;

  case 4106:
   return src.gain.gain.value;

  case 4109:
   return src.minGain;

  case 4110:
   return src.maxGain;

  case 4112:
   return src.state;

  case 4117:
   if (src.bufQueue.length === 1 && src.bufQueue[0].id === 0) {
    return 0;
   }
   return src.bufQueue.length;

  case 4118:
   if (src.bufQueue.length === 1 && src.bufQueue[0].id === 0 || src.looping) {
    return 0;
   }
   return src.bufsProcessed;

  case 4128:
   return src.refDistance;

  case 4129:
   return src.rolloffFactor;

  case 4130:
   return src.coneOuterGain;

  case 4131:
   return src.maxDistance;

  case 4132:
   return AL.sourceTell(src);

  case 4133:
   var offset = AL.sourceTell(src);
   if (offset > 0) {
    offset *= src.bufQueue[0].frequency;
   }
   return offset;

  case 4134:
   var offset = AL.sourceTell(src);
   if (offset > 0) {
    offset *= src.bufQueue[0].frequency * src.bufQueue[0].bytesPerSample;
   }
   return offset;

  case 4135:
   return src.type;

  case 4628:
   return src.spatialize;

  case 8201:
   var length = 0;
   var bytesPerFrame = 0;
   for (var i = 0; i < src.bufQueue.length; i++) {
    length += src.bufQueue[i].length;
    if (src.bufQueue[i].id !== 0) {
     bytesPerFrame = src.bufQueue[i].bytesPerSample * src.bufQueue[i].channels;
    }
   }
   return length * bytesPerFrame;

  case 8202:
   var length = 0;
   for (var i = 0; i < src.bufQueue.length; i++) {
    length += src.bufQueue[i].length;
   }
   return length;

  case 8203:
   return AL.sourceDuration(src);

  case 53248:
   return src.distanceModel;

  default:
   AL.currentCtx.err = 40962;
   return null;
  }
 },
 setSourceParam: function(funcname, sourceId, param, value) {
  if (!AL.currentCtx) {
   return;
  }
  var src = AL.currentCtx.sources[sourceId];
  if (!src) {
   AL.currentCtx.err = 40961;
   return;
  }
  if (value === null) {
   AL.currentCtx.err = 40962;
   return;
  }
  switch (param) {
  case 514:
   if (value === 1) {
    src.relative = true;
    AL.updateSourceSpace(src);
   } else if (value === 0) {
    src.relative = false;
    AL.updateSourceSpace(src);
   } else {
    AL.currentCtx.err = 40963;
    return;
   }
   break;

  case 4097:
   if (!Number.isFinite(value)) {
    AL.currentCtx.err = 40963;
    return;
   }
   src.coneInnerAngle = value;
   if (src.panner) {
    src.panner.coneInnerAngle = value % 360;
   }
   break;

  case 4098:
   if (!Number.isFinite(value)) {
    AL.currentCtx.err = 40963;
    return;
   }
   src.coneOuterAngle = value;
   if (src.panner) {
    src.panner.coneOuterAngle = value % 360;
   }
   break;

  case 4099:
   if (!Number.isFinite(value) || value <= 0) {
    AL.currentCtx.err = 40963;
    return;
   }
   if (src.pitch === value) {
    break;
   }
   src.pitch = value;
   AL.updateSourceRate(src);
   break;

  case 4100:
   if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
    AL.currentCtx.err = 40963;
    return;
   }
   src.position[0] = value[0];
   src.position[1] = value[1];
   src.position[2] = value[2];
   AL.updateSourceSpace(src);
   break;

  case 4101:
   if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
    AL.currentCtx.err = 40963;
    return;
   }
   src.direction[0] = value[0];
   src.direction[1] = value[1];
   src.direction[2] = value[2];
   AL.updateSourceSpace(src);
   break;

  case 4102:
   if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
    AL.currentCtx.err = 40963;
    return;
   }
   src.velocity[0] = value[0];
   src.velocity[1] = value[1];
   src.velocity[2] = value[2];
   AL.updateSourceSpace(src);
   break;

  case 4103:
   if (value === 1) {
    src.looping = true;
    AL.updateSourceTime(src);
    if (src.type === 4136 && src.audioQueue.length > 0) {
     var audioSrc = src.audioQueue[0];
     audioSrc.loop = true;
     audioSrc._duration = Number.POSITIVE_INFINITY;
    }
   } else if (value === 0) {
    src.looping = false;
    var currentTime = AL.updateSourceTime(src);
    if (src.type === 4136 && src.audioQueue.length > 0) {
     var audioSrc = src.audioQueue[0];
     audioSrc.loop = false;
     audioSrc._duration = src.bufQueue[0].audioBuf.duration / src.playbackRate;
     audioSrc._startTime = currentTime - src.bufOffset / src.playbackRate;
    }
   } else {
    AL.currentCtx.err = 40963;
    return;
   }
   break;

  case 4105:
   if (src.state === 4114 || src.state === 4115) {
    AL.currentCtx.err = 40964;
    return;
   }
   if (value === 0) {
    for (var i in src.bufQueue) {
     src.bufQueue[i].refCount--;
    }
    src.bufQueue.length = 1;
    src.bufQueue[0] = AL.buffers[0];
    src.bufsProcessed = 0;
    src.type = 4144;
   } else {
    var buf = AL.buffers[value];
    if (!buf) {
     AL.currentCtx.err = 40963;
     return;
    }
    for (var i in src.bufQueue) {
     src.bufQueue[i].refCount--;
    }
    src.bufQueue.length = 0;
    buf.refCount++;
    src.bufQueue = [ buf ];
    src.bufsProcessed = 0;
    src.type = 4136;
   }
   AL.initSourcePanner(src);
   AL.scheduleSourceAudio(src);
   break;

  case 4106:
   if (!Number.isFinite(value) || value < 0) {
    AL.currentCtx.err = 40963;
    return;
   }
   src.gain.gain.value = value;
   break;

  case 4109:
   if (!Number.isFinite(value) || value < 0 || value > Math.min(src.maxGain, 1)) {
    AL.currentCtx.err = 40963;
    return;
   }
   src.minGain = value;
   break;

  case 4110:
   if (!Number.isFinite(value) || value < Math.max(0, src.minGain) || value > 1) {
    AL.currentCtx.err = 40963;
    return;
   }
   src.maxGain = value;
   break;

  case 4128:
   if (!Number.isFinite(value) || value < 0) {
    AL.currentCtx.err = 40963;
    return;
   }
   src.refDistance = value;
   if (src.panner) {
    src.panner.refDistance = value;
   }
   break;

  case 4129:
   if (!Number.isFinite(value) || value < 0) {
    AL.currentCtx.err = 40963;
    return;
   }
   src.rolloffFactor = value;
   if (src.panner) {
    src.panner.rolloffFactor = value;
   }
   break;

  case 4130:
   if (!Number.isFinite(value) || value < 0 || value > 1) {
    AL.currentCtx.err = 40963;
    return;
   }
   src.coneOuterGain = value;
   if (src.panner) {
    src.panner.coneOuterGain = value;
   }
   break;

  case 4131:
   if (!Number.isFinite(value) || value < 0) {
    AL.currentCtx.err = 40963;
    return;
   }
   src.maxDistance = value;
   if (src.panner) {
    src.panner.maxDistance = value;
   }
   break;

  case 4132:
   if (value < 0 || value > AL.sourceDuration(src)) {
    AL.currentCtx.err = 40963;
    return;
   }
   AL.sourceSeek(src, value);
   break;

  case 4133:
   var srcLen = AL.sourceDuration(src);
   if (srcLen > 0) {
    var frequency;
    for (var bufId in src.bufQueue) {
     if (bufId) {
      frequency = src.bufQueue[bufId].frequency;
      break;
     }
    }
    value /= frequency;
   }
   if (value < 0 || value > srcLen) {
    AL.currentCtx.err = 40963;
    return;
   }
   AL.sourceSeek(src, value);
   break;

  case 4134:
   var srcLen = AL.sourceDuration(src);
   if (srcLen > 0) {
    var bytesPerSec;
    for (var bufId in src.bufQueue) {
     if (bufId) {
      var buf = src.bufQueue[bufId];
      bytesPerSec = buf.frequency * buf.bytesPerSample * buf.channels;
      break;
     }
    }
    value /= bytesPerSec;
   }
   if (value < 0 || value > srcLen) {
    AL.currentCtx.err = 40963;
    return;
   }
   AL.sourceSeek(src, value);
   break;

  case 4628:
   if (value !== 0 && value !== 1 && value !== 2) {
    AL.currentCtx.err = 40963;
    return;
   }
   src.spatialize = value;
   AL.initSourcePanner(src);
   break;

  case 8201:
  case 8202:
  case 8203:
   AL.currentCtx.err = 40964;
   break;

  case 53248:
   switch (value) {
   case 0:
   case 53249:
   case 53250:
   case 53251:
   case 53252:
   case 53253:
   case 53254:
    src.distanceModel = value;
    if (AL.currentCtx.sourceDistanceModel) {
     AL.updateContextGlobal(AL.currentCtx);
    }
    break;

   default:
    AL.currentCtx.err = 40963;
    return;
   }
   break;

  default:
   AL.currentCtx.err = 40962;
   return;
  }
 },
 captures: {},
 sharedCaptureAudioCtx: null,
 requireValidCaptureDevice: function(deviceId, funcname) {
  if (deviceId === 0) {
   AL.alcErr = 40961;
   return null;
  }
  var c = AL.captures[deviceId];
  if (!c) {
   AL.alcErr = 40961;
   return null;
  }
  var err = c.mediaStreamError;
  if (err) {
   AL.alcErr = 40961;
   return null;
  }
  return c;
 }
};

function _alBufferData(bufferId, format, pData, size, freq) {
 if (!AL.currentCtx) {
  return;
 }
 var buf = AL.buffers[bufferId];
 if (!buf) {
  AL.currentCtx.err = 40963;
  return;
 }
 if (freq <= 0) {
  AL.currentCtx.err = 40963;
  return;
 }
 var audioBuf = null;
 try {
  switch (format) {
  case 4352:
   if (size > 0) {
    audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size, freq);
    var channel0 = audioBuf.getChannelData(0);
    for (var i = 0; i < size; ++i) {
     channel0[i] = HEAPU8[pData++] * .0078125 - 1;
    }
   }
   buf.bytesPerSample = 1;
   buf.channels = 1;
   buf.length = size;
   break;

  case 4353:
   if (size > 0) {
    audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size >> 1, freq);
    var channel0 = audioBuf.getChannelData(0);
    pData >>= 1;
    for (var i = 0; i < size >> 1; ++i) {
     channel0[i] = HEAP16[pData++] * 30517578125e-15;
    }
   }
   buf.bytesPerSample = 2;
   buf.channels = 1;
   buf.length = size >> 1;
   break;

  case 4354:
   if (size > 0) {
    audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 1, freq);
    var channel0 = audioBuf.getChannelData(0);
    var channel1 = audioBuf.getChannelData(1);
    for (var i = 0; i < size >> 1; ++i) {
     channel0[i] = HEAPU8[pData++] * .0078125 - 1;
     channel1[i] = HEAPU8[pData++] * .0078125 - 1;
    }
   }
   buf.bytesPerSample = 1;
   buf.channels = 2;
   buf.length = size >> 1;
   break;

  case 4355:
   if (size > 0) {
    audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 2, freq);
    var channel0 = audioBuf.getChannelData(0);
    var channel1 = audioBuf.getChannelData(1);
    pData >>= 1;
    for (var i = 0; i < size >> 2; ++i) {
     channel0[i] = HEAP16[pData++] * 30517578125e-15;
     channel1[i] = HEAP16[pData++] * 30517578125e-15;
    }
   }
   buf.bytesPerSample = 2;
   buf.channels = 2;
   buf.length = size >> 2;
   break;

  case 65552:
   if (size > 0) {
    audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size >> 2, freq);
    var channel0 = audioBuf.getChannelData(0);
    pData >>= 2;
    for (var i = 0; i < size >> 2; ++i) {
     channel0[i] = HEAPF32[pData++];
    }
   }
   buf.bytesPerSample = 4;
   buf.channels = 1;
   buf.length = size >> 2;
   break;

  case 65553:
   if (size > 0) {
    audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 3, freq);
    var channel0 = audioBuf.getChannelData(0);
    var channel1 = audioBuf.getChannelData(1);
    pData >>= 2;
    for (var i = 0; i < size >> 3; ++i) {
     channel0[i] = HEAPF32[pData++];
     channel1[i] = HEAPF32[pData++];
    }
   }
   buf.bytesPerSample = 4;
   buf.channels = 2;
   buf.length = size >> 3;
   break;

  default:
   AL.currentCtx.err = 40963;
   return;
  }
  buf.frequency = freq;
  buf.audioBuf = audioBuf;
 } catch (e) {
  AL.currentCtx.err = 40963;
  return;
 }
}

function _alDeleteBuffers(count, pBufferIds) {
 if (!AL.currentCtx) {
  return;
 }
 for (var i = 0; i < count; ++i) {
  var bufId = HEAP32[pBufferIds + i * 4 >> 2];
  if (bufId === 0) {
   continue;
  }
  if (!AL.buffers[bufId]) {
   AL.currentCtx.err = 40961;
   return;
  }
  if (AL.buffers[bufId].refCount) {
   AL.currentCtx.err = 40964;
   return;
  }
 }
 for (var i = 0; i < count; ++i) {
  var bufId = HEAP32[pBufferIds + i * 4 >> 2];
  if (bufId === 0) {
   continue;
  }
  AL.deviceRefCounts[AL.buffers[bufId].deviceId]--;
  delete AL.buffers[bufId];
  AL.freeIds.push(bufId);
 }
}

function _alSourcei(sourceId, param, value) {
 switch (param) {
 case 514:
 case 4097:
 case 4098:
 case 4103:
 case 4105:
 case 4128:
 case 4129:
 case 4131:
 case 4132:
 case 4133:
 case 4134:
 case 4628:
 case 8201:
 case 8202:
 case 53248:
  AL.setSourceParam("alSourcei", sourceId, param, value);
  break;

 default:
  AL.setSourceParam("alSourcei", sourceId, param, null);
  break;
 }
}

function _alDeleteSources(count, pSourceIds) {
 if (!AL.currentCtx) {
  return;
 }
 for (var i = 0; i < count; ++i) {
  var srcId = HEAP32[pSourceIds + i * 4 >> 2];
  if (!AL.currentCtx.sources[srcId]) {
   AL.currentCtx.err = 40961;
   return;
  }
 }
 for (var i = 0; i < count; ++i) {
  var srcId = HEAP32[pSourceIds + i * 4 >> 2];
  AL.setSourceState(AL.currentCtx.sources[srcId], 4116);
  _alSourcei(srcId, 4105, 0);
  delete AL.currentCtx.sources[srcId];
  AL.freeIds.push(srcId);
 }
}

function _alGenBuffers(count, pBufferIds) {
 if (!AL.currentCtx) {
  return;
 }
 for (var i = 0; i < count; ++i) {
  var buf = {
   deviceId: AL.currentCtx.deviceId,
   id: AL.newId(),
   refCount: 0,
   audioBuf: null,
   frequency: 0,
   bytesPerSample: 2,
   channels: 1,
   length: 0
  };
  AL.deviceRefCounts[buf.deviceId]++;
  AL.buffers[buf.id] = buf;
  HEAP32[pBufferIds + i * 4 >> 2] = buf.id;
 }
}

function _alGenSources(count, pSourceIds) {
 if (!AL.currentCtx) {
  return;
 }
 for (var i = 0; i < count; ++i) {
  var gain = AL.currentCtx.audioCtx.createGain();
  gain.connect(AL.currentCtx.gain);
  var src = {
   context: AL.currentCtx,
   id: AL.newId(),
   type: 4144,
   state: 4113,
   bufQueue: [ AL.buffers[0] ],
   audioQueue: [],
   looping: false,
   pitch: 1,
   dopplerShift: 1,
   gain: gain,
   minGain: 0,
   maxGain: 1,
   panner: null,
   bufsProcessed: 0,
   bufStartTime: Number.NEGATIVE_INFINITY,
   bufOffset: 0,
   relative: false,
   refDistance: 1,
   maxDistance: 340282e33,
   rolloffFactor: 1,
   position: [ 0, 0, 0 ],
   velocity: [ 0, 0, 0 ],
   direction: [ 0, 0, 0 ],
   coneOuterGain: 0,
   coneInnerAngle: 360,
   coneOuterAngle: 360,
   distanceModel: 53250,
   spatialize: 2,
   get playbackRate() {
    return this.pitch * this.dopplerShift;
   }
  };
  AL.currentCtx.sources[src.id] = src;
  HEAP32[pSourceIds + i * 4 >> 2] = src.id;
 }
}

function _alGetEnumValue(pEnumName) {
 if (!AL.currentCtx) {
  return 0;
 }
 if (!pEnumName) {
  AL.currentCtx.err = 40963;
  return 0;
 }
 var name = UTF8ToString(pEnumName);
 switch (name) {
 case "AL_BITS":
  return 8194;

 case "AL_BUFFER":
  return 4105;

 case "AL_BUFFERS_PROCESSED":
  return 4118;

 case "AL_BUFFERS_QUEUED":
  return 4117;

 case "AL_BYTE_OFFSET":
  return 4134;

 case "AL_CHANNELS":
  return 8195;

 case "AL_CONE_INNER_ANGLE":
  return 4097;

 case "AL_CONE_OUTER_ANGLE":
  return 4098;

 case "AL_CONE_OUTER_GAIN":
  return 4130;

 case "AL_DIRECTION":
  return 4101;

 case "AL_DISTANCE_MODEL":
  return 53248;

 case "AL_DOPPLER_FACTOR":
  return 49152;

 case "AL_DOPPLER_VELOCITY":
  return 49153;

 case "AL_EXPONENT_DISTANCE":
  return 53253;

 case "AL_EXPONENT_DISTANCE_CLAMPED":
  return 53254;

 case "AL_EXTENSIONS":
  return 45060;

 case "AL_FORMAT_MONO16":
  return 4353;

 case "AL_FORMAT_MONO8":
  return 4352;

 case "AL_FORMAT_STEREO16":
  return 4355;

 case "AL_FORMAT_STEREO8":
  return 4354;

 case "AL_FREQUENCY":
  return 8193;

 case "AL_GAIN":
  return 4106;

 case "AL_INITIAL":
  return 4113;

 case "AL_INVALID":
  return -1;

 case "AL_ILLEGAL_ENUM":
 case "AL_INVALID_ENUM":
  return 40962;

 case "AL_INVALID_NAME":
  return 40961;

 case "AL_ILLEGAL_COMMAND":
 case "AL_INVALID_OPERATION":
  return 40964;

 case "AL_INVALID_VALUE":
  return 40963;

 case "AL_INVERSE_DISTANCE":
  return 53249;

 case "AL_INVERSE_DISTANCE_CLAMPED":
  return 53250;

 case "AL_LINEAR_DISTANCE":
  return 53251;

 case "AL_LINEAR_DISTANCE_CLAMPED":
  return 53252;

 case "AL_LOOPING":
  return 4103;

 case "AL_MAX_DISTANCE":
  return 4131;

 case "AL_MAX_GAIN":
  return 4110;

 case "AL_MIN_GAIN":
  return 4109;

 case "AL_NONE":
  return 0;

 case "AL_NO_ERROR":
  return 0;

 case "AL_ORIENTATION":
  return 4111;

 case "AL_OUT_OF_MEMORY":
  return 40965;

 case "AL_PAUSED":
  return 4115;

 case "AL_PENDING":
  return 8209;

 case "AL_PITCH":
  return 4099;

 case "AL_PLAYING":
  return 4114;

 case "AL_POSITION":
  return 4100;

 case "AL_PROCESSED":
  return 8210;

 case "AL_REFERENCE_DISTANCE":
  return 4128;

 case "AL_RENDERER":
  return 45059;

 case "AL_ROLLOFF_FACTOR":
  return 4129;

 case "AL_SAMPLE_OFFSET":
  return 4133;

 case "AL_SEC_OFFSET":
  return 4132;

 case "AL_SIZE":
  return 8196;

 case "AL_SOURCE_RELATIVE":
  return 514;

 case "AL_SOURCE_STATE":
  return 4112;

 case "AL_SOURCE_TYPE":
  return 4135;

 case "AL_SPEED_OF_SOUND":
  return 49155;

 case "AL_STATIC":
  return 4136;

 case "AL_STOPPED":
  return 4116;

 case "AL_STREAMING":
  return 4137;

 case "AL_UNDETERMINED":
  return 4144;

 case "AL_UNUSED":
  return 8208;

 case "AL_VELOCITY":
  return 4102;

 case "AL_VENDOR":
  return 45057;

 case "AL_VERSION":
  return 45058;

 case "AL_AUTO_SOFT":
  return 2;

 case "AL_SOURCE_DISTANCE_MODEL":
  return 512;

 case "AL_SOURCE_SPATIALIZE_SOFT":
  return 4628;

 case "AL_LOOP_POINTS_SOFT":
  return 8213;

 case "AL_BYTE_LENGTH_SOFT":
  return 8201;

 case "AL_SAMPLE_LENGTH_SOFT":
  return 8202;

 case "AL_SEC_LENGTH_SOFT":
  return 8203;

 case "AL_FORMAT_MONO_FLOAT32":
  return 65552;

 case "AL_FORMAT_STEREO_FLOAT32":
  return 65553;

 default:
  AL.currentCtx.err = 40963;
  return 0;
 }
}

function _alGetError() {
 if (!AL.currentCtx) {
  return 40964;
 }
 var err = AL.currentCtx.err;
 AL.currentCtx.err = 0;
 return err;
}

function _alGetSourcei(sourceId, param, pValue) {
 var val = AL.getSourceParam("alGetSourcei", sourceId, param);
 if (val === null) {
  return;
 }
 if (!pValue) {
  AL.currentCtx.err = 40963;
  return;
 }
 switch (param) {
 case 514:
 case 4097:
 case 4098:
 case 4103:
 case 4105:
 case 4112:
 case 4117:
 case 4118:
 case 4128:
 case 4129:
 case 4131:
 case 4132:
 case 4133:
 case 4134:
 case 4135:
 case 4628:
 case 8201:
 case 8202:
 case 53248:
  HEAP32[pValue >> 2] = val;
  break;

 default:
  AL.currentCtx.err = 40962;
  return;
 }
}

function _alListenerf(param, value) {
 switch (param) {
 case 4106:
  AL.setListenerParam("alListenerf", param, value);
  break;

 default:
  AL.setListenerParam("alListenerf", param, null);
  break;
 }
}

function _alSourcePause(sourceId) {
 if (!AL.currentCtx) {
  return;
 }
 var src = AL.currentCtx.sources[sourceId];
 if (!src) {
  AL.currentCtx.err = 40961;
  return;
 }
 AL.setSourceState(src, 4115);
}

function _alSourcePlay(sourceId) {
 if (!AL.currentCtx) {
  return;
 }
 var src = AL.currentCtx.sources[sourceId];
 if (!src) {
  AL.currentCtx.err = 40961;
  return;
 }
 AL.setSourceState(src, 4114);
}

function _alSourceQueueBuffers(sourceId, count, pBufferIds) {
 if (!AL.currentCtx) {
  return;
 }
 var src = AL.currentCtx.sources[sourceId];
 if (!src) {
  AL.currentCtx.err = 40961;
  return;
 }
 if (src.type === 4136) {
  AL.currentCtx.err = 40964;
  return;
 }
 if (count === 0) {
  return;
 }
 var templateBuf = AL.buffers[0];
 for (var i = 0; i < src.bufQueue.length; i++) {
  if (src.bufQueue[i].id !== 0) {
   templateBuf = src.bufQueue[i];
   break;
  }
 }
 for (var i = 0; i < count; ++i) {
  var bufId = HEAP32[pBufferIds + i * 4 >> 2];
  var buf = AL.buffers[bufId];
  if (!buf) {
   AL.currentCtx.err = 40961;
   return;
  }
  if (templateBuf.id !== 0 && (buf.frequency !== templateBuf.frequency || buf.bytesPerSample !== templateBuf.bytesPerSample || buf.channels !== templateBuf.channels)) {
   AL.currentCtx.err = 40964;
  }
 }
 if (src.bufQueue.length === 1 && src.bufQueue[0].id === 0) {
  src.bufQueue.length = 0;
 }
 src.type = 4137;
 for (var i = 0; i < count; ++i) {
  var bufId = HEAP32[pBufferIds + i * 4 >> 2];
  var buf = AL.buffers[bufId];
  buf.refCount++;
  src.bufQueue.push(buf);
 }
 if (src.looping) {
  AL.cancelPendingSourceAudio(src);
 }
 AL.initSourcePanner(src);
 AL.scheduleSourceAudio(src);
}

function _alSourceRewind(sourceId) {
 if (!AL.currentCtx) {
  return;
 }
 var src = AL.currentCtx.sources[sourceId];
 if (!src) {
  AL.currentCtx.err = 40961;
  return;
 }
 AL.setSourceState(src, 4116);
 AL.setSourceState(src, 4113);
}

function _alSourceStop(sourceId) {
 if (!AL.currentCtx) {
  return;
 }
 var src = AL.currentCtx.sources[sourceId];
 if (!src) {
  AL.currentCtx.err = 40961;
  return;
 }
 AL.setSourceState(src, 4116);
}

function _alSourceUnqueueBuffers(sourceId, count, pBufferIds) {
 if (!AL.currentCtx) {
  return;
 }
 var src = AL.currentCtx.sources[sourceId];
 if (!src) {
  AL.currentCtx.err = 40961;
  return;
 }
 if (count > (src.bufQueue.length === 1 && src.bufQueue[0].id === 0 ? 0 : src.bufsProcessed)) {
  AL.currentCtx.err = 40963;
  return;
 }
 if (count === 0) {
  return;
 }
 for (var i = 0; i < count; i++) {
  var buf = src.bufQueue.shift();
  buf.refCount--;
  HEAP32[pBufferIds + i * 4 >> 2] = buf.id;
  src.bufsProcessed--;
 }
 if (src.bufQueue.length === 0) {
  src.bufQueue.push(AL.buffers[0]);
 }
 AL.initSourcePanner(src);
 AL.scheduleSourceAudio(src);
}

function _alSourcef(sourceId, param, value) {
 switch (param) {
 case 4097:
 case 4098:
 case 4099:
 case 4106:
 case 4109:
 case 4110:
 case 4128:
 case 4129:
 case 4130:
 case 4131:
 case 4132:
 case 4133:
 case 4134:
 case 8203:
  AL.setSourceParam("alSourcef", sourceId, param, value);
  break;

 default:
  AL.setSourceParam("alSourcef", sourceId, param, null);
  break;
 }
}

function _alcCloseDevice(deviceId) {
 if (!(deviceId in AL.deviceRefCounts) || AL.deviceRefCounts[deviceId] > 0) {
  return 0;
 }
 delete AL.deviceRefCounts[deviceId];
 AL.freeIds.push(deviceId);
 return 1;
}

var listenOnce = (object, event, func) => {
 object.addEventListener(event, func, {
  "once": true
 });
};

var autoResumeAudioContext = (ctx, elements) => {
 if (!elements) {
  elements = [ document, document.getElementById("canvas") ];
 }
 [ "keydown", "mousedown", "touchstart" ].forEach(event => {
  elements.forEach(element => {
   if (element) {
    listenOnce(element, event, () => {
     if (ctx.state === "suspended") ctx.resume();
    });
   }
  });
 });
};

function _alcCreateContext(deviceId, pAttrList) {
 if (!(deviceId in AL.deviceRefCounts)) {
  AL.alcErr = 40961;
  return 0;
 }
 var options = null;
 var attrs = [];
 var hrtf = null;
 pAttrList >>= 2;
 if (pAttrList) {
  var attr = 0;
  var val = 0;
  while (true) {
   attr = HEAP32[pAttrList++];
   attrs.push(attr);
   if (attr === 0) {
    break;
   }
   val = HEAP32[pAttrList++];
   attrs.push(val);
   switch (attr) {
   case 4103:
    if (!options) {
     options = {};
    }
    options.sampleRate = val;
    break;

   case 4112:
   case 4113:
    break;

   case 6546:
    switch (val) {
    case 0:
     hrtf = false;
     break;

    case 1:
     hrtf = true;
     break;

    case 2:
     break;

    default:
     AL.alcErr = 40964;
     return 0;
    }
    break;

   case 6550:
    if (val !== 0) {
     AL.alcErr = 40964;
     return 0;
    }
    break;

   default:
    AL.alcErr = 40964;
    return 0;
   }
  }
 }
 var AudioContext = window.AudioContext || window.webkitAudioContext;
 var ac = null;
 try {
  if (options) {
   ac = new AudioContext(options);
  } else {
   ac = new AudioContext();
  }
 } catch (e) {
  if (e.name === "NotSupportedError") {
   AL.alcErr = 40964;
  } else {
   AL.alcErr = 40961;
  }
  return 0;
 }
 autoResumeAudioContext(ac);
 if (typeof ac.createGain == "undefined") {
  ac.createGain = ac.createGainNode;
 }
 var gain = ac.createGain();
 gain.connect(ac.destination);
 var ctx = {
  deviceId: deviceId,
  id: AL.newId(),
  attrs: attrs,
  audioCtx: ac,
  listener: {
   position: [ 0, 0, 0 ],
   velocity: [ 0, 0, 0 ],
   direction: [ 0, 0, 0 ],
   up: [ 0, 0, 0 ]
  },
  sources: [],
  interval: setInterval(function() {
   AL.scheduleContextAudio(ctx);
  }, AL.QUEUE_INTERVAL),
  gain: gain,
  distanceModel: 53250,
  speedOfSound: 343.3,
  dopplerFactor: 1,
  sourceDistanceModel: false,
  hrtf: hrtf || false,
  _err: 0,
  get err() {
   return this._err;
  },
  set err(val) {
   if (this._err === 0 || val === 0) {
    this._err = val;
   }
  }
 };
 AL.deviceRefCounts[deviceId]++;
 AL.contexts[ctx.id] = ctx;
 if (hrtf !== null) {
  for (var ctxId in AL.contexts) {
   var c = AL.contexts[ctxId];
   if (c.deviceId === deviceId) {
    c.hrtf = hrtf;
    AL.updateContextGlobal(c);
   }
  }
 }
 return ctx.id;
}

function _alcDestroyContext(contextId) {
 var ctx = AL.contexts[contextId];
 if (AL.currentCtx === ctx) {
  AL.alcErr = 40962;
  return;
 }
 if (AL.contexts[contextId].interval) {
  clearInterval(AL.contexts[contextId].interval);
 }
 AL.deviceRefCounts[ctx.deviceId]--;
 delete AL.contexts[contextId];
 AL.freeIds.push(contextId);
}

function _alcMakeContextCurrent(contextId) {
 if (contextId === 0) {
  AL.currentCtx = null;
 } else {
  AL.currentCtx = AL.contexts[contextId];
 }
 return 1;
}

function _alcOpenDevice(pDeviceName) {
 if (pDeviceName) {
  var name = UTF8ToString(pDeviceName);
  if (name !== AL.DEVICE_NAME) {
   return 0;
  }
 }
 if (typeof AudioContext != "undefined" || typeof webkitAudioContext != "undefined") {
  var deviceId = AL.newId();
  AL.deviceRefCounts[deviceId] = 0;
  return deviceId;
 }
 return 0;
}

var readEmAsmArgsArray = [];

var readEmAsmArgs = (sigPtr, buf) => {
 readEmAsmArgsArray.length = 0;
 var ch;
 buf >>= 2;
 while (ch = HEAPU8[sigPtr++]) {
  buf += ch != 105 & buf;
  readEmAsmArgsArray.push(ch == 105 ? HEAP32[buf] : HEAPF64[buf++ >> 1]);
  ++buf;
 }
 return readEmAsmArgsArray;
};

var runEmAsmFunction = (code, sigPtr, argbuf) => {
 var args = readEmAsmArgs(sigPtr, argbuf);
 return ASM_CONSTS[code].apply(null, args);
};

var _emscripten_asm_const_int = (code, sigPtr, argbuf) => {
 return runEmAsmFunction(code, sigPtr, argbuf);
};

function _emscripten_date_now() {
 return Date.now();
}

function _emscripten_is_main_browser_thread() {
 return !ENVIRONMENT_IS_WORKER;
}

var _emscripten_memcpy_big = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);

var getHeapMax = () => 2147483648;

var growMemory = size => {
 var b = wasmMemory.buffer;
 var pages = size - b.byteLength + 65535 >>> 16;
 try {
  wasmMemory.grow(pages);
  updateMemoryViews();
  return 1;
 } catch (e) {}
};

var _emscripten_resize_heap = requestedSize => {
 var oldSize = HEAPU8.length;
 requestedSize = requestedSize >>> 0;
 var maxHeapSize = getHeapMax();
 if (requestedSize > maxHeapSize) {
  return false;
 }
 var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
 for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
  var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
  overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
  var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  var replacement = growMemory(newSize);
  if (replacement) {
   return true;
  }
 }
 return false;
};

var _emscripten_run_script_int = ptr => {
 return eval(UTF8ToString(ptr)) | 0;
};

function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop) {
 var browserIterationFunc = getWasmTableEntry(func);
 setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop);
}

var Fetch = {
 openDatabase: function(dbname, dbversion, onsuccess, onerror) {
  try {
   var openRequest = indexedDB.open(dbname, dbversion);
  } catch (e) {
   return onerror(e);
  }
  openRequest.onupgradeneeded = event => {
   var db = event.target.result;
   if (db.objectStoreNames.contains("FILES")) {
    db.deleteObjectStore("FILES");
   }
   db.createObjectStore("FILES");
  };
  openRequest.onsuccess = event => onsuccess(event.target.result);
  openRequest.onerror = error => onerror(error);
 },
 init: function() {
  Fetch.xhrs = new HandleAllocator();
  var onsuccess = db => {
   Fetch.dbInstance = db;
   removeRunDependency("library_fetch_init");
  };
  var onerror = () => {
   Fetch.dbInstance = false;
   removeRunDependency("library_fetch_init");
  };
  addRunDependency("library_fetch_init");
  Fetch.openDatabase("emscripten_filesystem", 1, onsuccess, onerror);
 }
};

function fetchXHR(fetch, onsuccess, onerror, onprogress, onreadystatechange) {
 var url = HEAPU32[fetch + 8 >> 2];
 if (!url) {
  onerror(fetch, 0, "no url specified!");
  return;
 }
 var url_ = UTF8ToString(url);
 var fetch_attr = fetch + 112;
 var requestMethod = UTF8ToString(fetch_attr + 0);
 if (!requestMethod) requestMethod = "GET";
 var timeoutMsecs = HEAPU32[fetch_attr + 56 >> 2];
 var userName = HEAPU32[fetch_attr + 68 >> 2];
 var password = HEAPU32[fetch_attr + 72 >> 2];
 var requestHeaders = HEAPU32[fetch_attr + 76 >> 2];
 var overriddenMimeType = HEAPU32[fetch_attr + 80 >> 2];
 var dataPtr = HEAPU32[fetch_attr + 84 >> 2];
 var dataLength = HEAPU32[fetch_attr + 88 >> 2];
 var fetchAttributes = HEAPU32[fetch_attr + 52 >> 2];
 var fetchAttrLoadToMemory = !!(fetchAttributes & 1);
 var fetchAttrStreamData = !!(fetchAttributes & 2);
 var fetchAttrSynchronous = !!(fetchAttributes & 64);
 var userNameStr = userName ? UTF8ToString(userName) : undefined;
 var passwordStr = password ? UTF8ToString(password) : undefined;
 var xhr = new XMLHttpRequest();
 xhr.withCredentials = !!HEAPU8[fetch_attr + 60 >> 0];
 xhr.open(requestMethod, url_, !fetchAttrSynchronous, userNameStr, passwordStr);
 if (!fetchAttrSynchronous) xhr.timeout = timeoutMsecs;
 xhr.url_ = url_;
 xhr.responseType = "arraybuffer";
 if (overriddenMimeType) {
  var overriddenMimeTypeStr = UTF8ToString(overriddenMimeType);
  xhr.overrideMimeType(overriddenMimeTypeStr);
 }
 if (requestHeaders) {
  for (;;) {
   var key = HEAPU32[requestHeaders >> 2];
   if (!key) break;
   var value = HEAPU32[requestHeaders + 4 >> 2];
   if (!value) break;
   requestHeaders += 8;
   var keyStr = UTF8ToString(key);
   var valueStr = UTF8ToString(value);
   xhr.setRequestHeader(keyStr, valueStr);
  }
 }
 var id = Fetch.xhrs.allocate(xhr);
 HEAPU32[fetch >> 2] = id;
 var data = dataPtr && dataLength ? HEAPU8.slice(dataPtr, dataPtr + dataLength) : null;
 function saveResponseAndStatus() {
  var ptr = 0;
  var ptrLen = 0;
  if (xhr.response && fetchAttrLoadToMemory && HEAPU32[fetch + 12 >> 2] === 0) {
   ptrLen = xhr.response.byteLength;
  }
  if (ptrLen > 0) {
   ptr = _malloc(ptrLen);
   HEAPU8.set(new Uint8Array(xhr.response), ptr);
  }
  HEAPU32[fetch + 12 >> 2] = ptr;
  writeI53ToI64(fetch + 16, ptrLen);
  writeI53ToI64(fetch + 24, 0);
  var len = xhr.response ? xhr.response.byteLength : 0;
  if (len) {
   writeI53ToI64(fetch + 32, len);
  }
  HEAPU16[fetch + 40 >> 1] = xhr.readyState;
  HEAPU16[fetch + 42 >> 1] = xhr.status;
  if (xhr.statusText) stringToUTF8(xhr.statusText, fetch + 44, 64);
 }
 xhr.onload = e => {
  if (!Fetch.xhrs.has(id)) {
   return;
  }
  saveResponseAndStatus();
  if (xhr.status >= 200 && xhr.status < 300) {
   if (onsuccess) onsuccess(fetch, xhr, e);
  } else {
   if (onerror) onerror(fetch, xhr, e);
  }
 };
 xhr.onerror = e => {
  if (!Fetch.xhrs.has(id)) {
   return;
  }
  saveResponseAndStatus();
  if (onerror) onerror(fetch, xhr, e);
 };
 xhr.ontimeout = e => {
  if (!Fetch.xhrs.has(id)) {
   return;
  }
  if (onerror) onerror(fetch, xhr, e);
 };
 xhr.onprogress = e => {
  if (!Fetch.xhrs.has(id)) {
   return;
  }
  var ptrLen = fetchAttrLoadToMemory && fetchAttrStreamData && xhr.response ? xhr.response.byteLength : 0;
  var ptr = 0;
  if (ptrLen > 0 && fetchAttrLoadToMemory && fetchAttrStreamData) {
   ptr = _malloc(ptrLen);
   HEAPU8.set(new Uint8Array(xhr.response), ptr);
  }
  HEAPU32[fetch + 12 >> 2] = ptr;
  writeI53ToI64(fetch + 16, ptrLen);
  writeI53ToI64(fetch + 24, e.loaded - ptrLen);
  writeI53ToI64(fetch + 32, e.total);
  HEAPU16[fetch + 40 >> 1] = xhr.readyState;
  if (xhr.readyState >= 3 && xhr.status === 0 && e.loaded > 0) xhr.status = 200;
  HEAPU16[fetch + 42 >> 1] = xhr.status;
  if (xhr.statusText) stringToUTF8(xhr.statusText, fetch + 44, 64);
  if (onprogress) onprogress(fetch, xhr, e);
  if (ptr) {
   _free(ptr);
  }
 };
 xhr.onreadystatechange = e => {
  if (!Fetch.xhrs.has(id)) {
   return;
  }
  HEAPU16[fetch + 40 >> 1] = xhr.readyState;
  if (xhr.readyState >= 2) {
   HEAPU16[fetch + 42 >> 1] = xhr.status;
  }
  if (onreadystatechange) onreadystatechange(fetch, xhr, e);
 };
 try {
  xhr.send(data);
 } catch (e) {
  if (onerror) onerror(fetch, xhr, e);
 }
}

function writeI53ToI64(ptr, num) {
 HEAPU32[ptr >> 2] = num;
 HEAPU32[ptr + 4 >> 2] = (num - HEAPU32[ptr >> 2]) / 4294967296;
}

function fetchCacheData(db, fetch, data, onsuccess, onerror) {
 if (!db) {
  onerror(fetch, 0, "IndexedDB not available!");
  return;
 }
 var fetch_attr = fetch + 112;
 var destinationPath = HEAPU32[fetch_attr + 64 >> 2];
 if (!destinationPath) destinationPath = HEAPU32[fetch + 8 >> 2];
 var destinationPathStr = UTF8ToString(destinationPath);
 try {
  var transaction = db.transaction([ "FILES" ], "readwrite");
  var packages = transaction.objectStore("FILES");
  var putRequest = packages.put(data, destinationPathStr);
  putRequest.onsuccess = event => {
   HEAPU16[fetch + 40 >> 1] = 4;
   HEAPU16[fetch + 42 >> 1] = 200;
   stringToUTF8("OK", fetch + 44, 64);
   onsuccess(fetch, 0, destinationPathStr);
  };
  putRequest.onerror = error => {
   HEAPU16[fetch + 40 >> 1] = 4;
   HEAPU16[fetch + 42 >> 1] = 413;
   stringToUTF8("Payload Too Large", fetch + 44, 64);
   onerror(fetch, 0, error);
  };
 } catch (e) {
  onerror(fetch, 0, e);
 }
}

function fetchLoadCachedData(db, fetch, onsuccess, onerror) {
 if (!db) {
  onerror(fetch, 0, "IndexedDB not available!");
  return;
 }
 var fetch_attr = fetch + 112;
 var path = HEAPU32[fetch_attr + 64 >> 2];
 if (!path) path = HEAPU32[fetch + 8 >> 2];
 var pathStr = UTF8ToString(path);
 try {
  var transaction = db.transaction([ "FILES" ], "readonly");
  var packages = transaction.objectStore("FILES");
  var getRequest = packages.get(pathStr);
  getRequest.onsuccess = event => {
   if (event.target.result) {
    var value = event.target.result;
    var len = value.byteLength || value.length;
    var ptr = _malloc(len);
    HEAPU8.set(new Uint8Array(value), ptr);
    HEAPU32[fetch + 12 >> 2] = ptr;
    writeI53ToI64(fetch + 16, len);
    writeI53ToI64(fetch + 24, 0);
    writeI53ToI64(fetch + 32, len);
    HEAPU16[fetch + 40 >> 1] = 4;
    HEAPU16[fetch + 42 >> 1] = 200;
    stringToUTF8("OK", fetch + 44, 64);
    onsuccess(fetch, 0, value);
   } else {
    HEAPU16[fetch + 40 >> 1] = 4;
    HEAPU16[fetch + 42 >> 1] = 404;
    stringToUTF8("Not Found", fetch + 44, 64);
    onerror(fetch, 0, "no data");
   }
  };
  getRequest.onerror = error => {
   HEAPU16[fetch + 40 >> 1] = 4;
   HEAPU16[fetch + 42 >> 1] = 404;
   stringToUTF8("Not Found", fetch + 44, 64);
   onerror(fetch, 0, error);
  };
 } catch (e) {
  onerror(fetch, 0, e);
 }
}

function fetchDeleteCachedData(db, fetch, onsuccess, onerror) {
 if (!db) {
  onerror(fetch, 0, "IndexedDB not available!");
  return;
 }
 var fetch_attr = fetch + 112;
 var path = HEAPU32[fetch_attr + 64 >> 2];
 if (!path) path = HEAPU32[fetch + 8 >> 2];
 var pathStr = UTF8ToString(path);
 try {
  var transaction = db.transaction([ "FILES" ], "readwrite");
  var packages = transaction.objectStore("FILES");
  var request = packages.delete(pathStr);
  request.onsuccess = event => {
   var value = event.target.result;
   HEAPU32[fetch + 12 >> 2] = 0;
   writeI53ToI64(fetch + 16, 0);
   writeI53ToI64(fetch + 24, 0);
   writeI53ToI64(fetch + 32, 0);
   HEAPU16[fetch + 40 >> 1] = 4;
   HEAPU16[fetch + 42 >> 1] = 200;
   stringToUTF8("OK", fetch + 44, 64);
   onsuccess(fetch, 0, value);
  };
  request.onerror = error => {
   HEAPU16[fetch + 40 >> 1] = 4;
   HEAPU16[fetch + 42 >> 1] = 404;
   stringToUTF8("Not Found", fetch + 44, 64);
   onerror(fetch, 0, error);
  };
 } catch (e) {
  onerror(fetch, 0, e);
 }
}

function _emscripten_start_fetch(fetch, successcb, errorcb, progresscb, readystatechangecb) {
 var fetch_attr = fetch + 112;
 var onsuccess = HEAPU32[fetch_attr + 36 >> 2];
 var onerror = HEAPU32[fetch_attr + 40 >> 2];
 var onprogress = HEAPU32[fetch_attr + 44 >> 2];
 var onreadystatechange = HEAPU32[fetch_attr + 48 >> 2];
 var fetchAttributes = HEAPU32[fetch_attr + 52 >> 2];
 var fetchAttrSynchronous = !!(fetchAttributes & 64);
 function doCallback(f) {
  if (fetchAttrSynchronous) {
   f();
  } else {
   callUserCallback(f);
  }
 }
 var reportSuccess = (fetch, xhr, e) => {
  doCallback(() => {
   if (onsuccess) getWasmTableEntry(onsuccess)(fetch); else if (successcb) successcb(fetch);
  });
 };
 var reportProgress = (fetch, xhr, e) => {
  doCallback(() => {
   if (onprogress) getWasmTableEntry(onprogress)(fetch); else if (progresscb) progresscb(fetch);
  });
 };
 var reportError = (fetch, xhr, e) => {
  doCallback(() => {
   if (onerror) getWasmTableEntry(onerror)(fetch); else if (errorcb) errorcb(fetch);
  });
 };
 var reportReadyStateChange = (fetch, xhr, e) => {
  doCallback(() => {
   if (onreadystatechange) getWasmTableEntry(onreadystatechange)(fetch); else if (readystatechangecb) readystatechangecb(fetch);
  });
 };
 var performUncachedXhr = (fetch, xhr, e) => {
  fetchXHR(fetch, reportSuccess, reportError, reportProgress, reportReadyStateChange);
 };
 var cacheResultAndReportSuccess = (fetch, xhr, e) => {
  var storeSuccess = (fetch, xhr, e) => {
   doCallback(() => {
    if (onsuccess) getWasmTableEntry(onsuccess)(fetch); else if (successcb) successcb(fetch);
   });
  };
  var storeError = (fetch, xhr, e) => {
   doCallback(() => {
    if (onsuccess) getWasmTableEntry(onsuccess)(fetch); else if (successcb) successcb(fetch);
   });
  };
  fetchCacheData(Fetch.dbInstance, fetch, xhr.response, storeSuccess, storeError);
 };
 var performCachedXhr = (fetch, xhr, e) => {
  fetchXHR(fetch, cacheResultAndReportSuccess, reportError, reportProgress, reportReadyStateChange);
 };
 var requestMethod = UTF8ToString(fetch_attr + 0);
 var fetchAttrReplace = !!(fetchAttributes & 16);
 var fetchAttrPersistFile = !!(fetchAttributes & 4);
 var fetchAttrNoDownload = !!(fetchAttributes & 32);
 if (requestMethod === "EM_IDB_STORE") {
  var ptr = HEAPU32[fetch_attr + 84 >> 2];
  var size = HEAPU32[fetch_attr + 88 >> 2];
  fetchCacheData(Fetch.dbInstance, fetch, HEAPU8.slice(ptr, ptr + size), reportSuccess, reportError);
 } else if (requestMethod === "EM_IDB_DELETE") {
  fetchDeleteCachedData(Fetch.dbInstance, fetch, reportSuccess, reportError);
 } else if (!fetchAttrReplace) {
  fetchLoadCachedData(Fetch.dbInstance, fetch, reportSuccess, fetchAttrNoDownload ? reportError : fetchAttrPersistFile ? performCachedXhr : performUncachedXhr);
 } else if (!fetchAttrNoDownload) {
  fetchXHR(fetch, fetchAttrPersistFile ? cacheResultAndReportSuccess : reportSuccess, reportError, reportProgress, reportReadyStateChange);
 } else {
  return 0;
 }
 return fetch;
}

var ENV = {};

var getExecutableName = () => {
 return thisProgram || "./this.program";
};

var getEnvStrings = () => {
 if (!getEnvStrings.strings) {
  var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
  var env = {
   "USER": "web_user",
   "LOGNAME": "web_user",
   "PATH": "/",
   "PWD": "/",
   "HOME": "/home/web_user",
   "LANG": lang,
   "_": getExecutableName()
  };
  for (var x in ENV) {
   if (ENV[x] === undefined) delete env[x]; else env[x] = ENV[x];
  }
  var strings = [];
  for (var x in env) {
   strings.push(`${x}=${env[x]}`);
  }
  getEnvStrings.strings = strings;
 }
 return getEnvStrings.strings;
};

var stringToAscii = (str, buffer) => {
 for (var i = 0; i < str.length; ++i) {
  HEAP8[buffer++ >> 0] = str.charCodeAt(i);
 }
 HEAP8[buffer >> 0] = 0;
};

var _environ_get = (__environ, environ_buf) => {
 var bufSize = 0;
 getEnvStrings().forEach(function(string, i) {
  var ptr = environ_buf + bufSize;
  HEAPU32[__environ + i * 4 >> 2] = ptr;
  stringToAscii(string, ptr);
  bufSize += string.length + 1;
 });
 return 0;
};

var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
 var strings = getEnvStrings();
 HEAPU32[penviron_count >> 2] = strings.length;
 var bufSize = 0;
 strings.forEach(function(string) {
  bufSize += string.length + 1;
 });
 HEAPU32[penviron_buf_size >> 2] = bufSize;
 return 0;
};

function _fd_close(fd) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.close(stream);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

var doReadv = (stream, iov, iovcnt, offset) => {
 var ret = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = HEAPU32[iov >> 2];
  var len = HEAPU32[iov + 4 >> 2];
  iov += 8;
  var curr = FS.read(stream, HEAP8, ptr, len, offset);
  if (curr < 0) return -1;
  ret += curr;
  if (curr < len) break;
  if (typeof offset !== "undefined") {
   offset += curr;
  }
 }
 return ret;
};

function _fd_read(fd, iov, iovcnt, pnum) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doReadv(stream, iov, iovcnt);
  HEAPU32[pnum >> 2] = num;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function convertI32PairToI53Checked(lo, hi) {
 return hi + 2097152 >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN;
}

function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
 try {
  var offset = convertI32PairToI53Checked(offset_low, offset_high);
  if (isNaN(offset)) return 61;
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.llseek(stream, offset, whence);
  tempI64 = [ stream.position >>> 0, (tempDouble = stream.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
  if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

var doWritev = (stream, iov, iovcnt, offset) => {
 var ret = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = HEAPU32[iov >> 2];
  var len = HEAPU32[iov + 4 >> 2];
  iov += 8;
  var curr = FS.write(stream, HEAP8, ptr, len, offset);
  if (curr < 0) return -1;
  ret += curr;
  if (typeof offset !== "undefined") {
   offset += curr;
  }
 }
 return ret;
};

function _fd_write(fd, iov, iovcnt, pnum) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doWritev(stream, iov, iovcnt);
  HEAPU32[pnum >> 2] = num;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _glActiveTexture(x0) {
 GLctx.activeTexture(x0);
}

function _glAttachShader(program, shader) {
 GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
}

function _glBindBuffer(target, buffer) {
 if (target == 34962) {
  GLctx.currentArrayBufferBinding = buffer;
 } else if (target == 34963) {
  GLctx.currentElementArrayBufferBinding = buffer;
 }
 GLctx.bindBuffer(target, GL.buffers[buffer]);
}

function _glBindBufferBase() {
 err("missing function: glBindBufferBase");
 abort(-1);
}

function _glBindFramebuffer(target, framebuffer) {
 GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
}

function _glBindTexture(target, texture) {
 GLctx.bindTexture(target, GL.textures[texture]);
}

function _glBlendFunc(x0, x1) {
 GLctx.blendFunc(x0, x1);
}

function _glClear(x0) {
 GLctx.clear(x0);
}

function _glClearColor(x0, x1, x2, x3) {
 GLctx.clearColor(x0, x1, x2, x3);
}

function _glCompileShader(shader) {
 GLctx.compileShader(GL.shaders[shader]);
}

function _glCompressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data) {
 GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, data ? HEAPU8.subarray(data, data + imageSize) : null);
}

function _glCreateProgram() {
 var id = GL.getNewId(GL.programs);
 var program = GLctx.createProgram();
 program.name = id;
 program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
 program.uniformIdCounter = 1;
 GL.programs[id] = program;
 return id;
}

function _glCreateShader(shaderType) {
 var id = GL.getNewId(GL.shaders);
 GL.shaders[id] = GLctx.createShader(shaderType);
 return id;
}

function _glDeleteProgram(id) {
 if (!id) return;
 var program = GL.programs[id];
 if (!program) {
  GL.recordError(1281);
  return;
 }
 GLctx.deleteProgram(program);
 program.name = 0;
 GL.programs[id] = null;
}

function _glDeleteShader(id) {
 if (!id) return;
 var shader = GL.shaders[id];
 if (!shader) {
  GL.recordError(1281);
  return;
 }
 GLctx.deleteShader(shader);
 GL.shaders[id] = null;
}

function _glDeleteTextures(n, textures) {
 for (var i = 0; i < n; i++) {
  var id = HEAP32[textures + i * 4 >> 2];
  var texture = GL.textures[id];
  if (!texture) continue;
  GLctx.deleteTexture(texture);
  texture.name = 0;
  GL.textures[id] = null;
 }
}

function _glDisable(x0) {
 GLctx.disable(x0);
}

function _glDisableVertexAttribArray(index) {
 var cb = GL.currentContext.clientBuffers[index];
 cb.enabled = false;
 GLctx.disableVertexAttribArray(index);
}

function _glDrawArrays(mode, first, count) {
 GL.preDrawHandleClientVertexAttribBindings(first + count);
 GLctx.drawArrays(mode, first, count);
 GL.postDrawHandleClientVertexAttribBindings();
}

function _glDrawElements(mode, count, type, indices) {
 var buf;
 if (!GLctx.currentElementArrayBufferBinding) {
  var size = GL.calcBufLength(1, type, 0, count);
  buf = GL.getTempIndexBuffer(size);
  GLctx.bindBuffer(34963, buf);
  GLctx.bufferSubData(34963, 0, HEAPU8.subarray(indices, indices + size));
  indices = 0;
 }
 GL.preDrawHandleClientVertexAttribBindings(count);
 GLctx.drawElements(mode, count, type, indices);
 GL.postDrawHandleClientVertexAttribBindings(count);
 if (!GLctx.currentElementArrayBufferBinding) {
  GLctx.bindBuffer(34963, null);
 }
}

function _glEnable(x0) {
 GLctx.enable(x0);
}

function _glEnableVertexAttribArray(index) {
 var cb = GL.currentContext.clientBuffers[index];
 cb.enabled = true;
 GLctx.enableVertexAttribArray(index);
}

function __glGenObject(n, buffers, createFunction, objectTable) {
 for (var i = 0; i < n; i++) {
  var buffer = GLctx[createFunction]();
  var id = buffer && GL.getNewId(objectTable);
  if (buffer) {
   buffer.name = id;
   objectTable[id] = buffer;
  } else {
   GL.recordError(1282);
  }
  HEAP32[buffers + i * 4 >> 2] = id;
 }
}

function _glGenTextures(n, textures) {
 __glGenObject(n, textures, "createTexture", GL.textures);
}

function _glGetAttribLocation(program, name) {
 return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
}

function emscriptenWebGLGet(name_, p, type) {
 if (!p) {
  GL.recordError(1281);
  return;
 }
 var ret = undefined;
 switch (name_) {
 case 36346:
  ret = 1;
  break;

 case 36344:
  if (type != 0 && type != 1) {
   GL.recordError(1280);
  }
  return;

 case 36345:
  ret = 0;
  break;

 case 34466:
  var formats = GLctx.getParameter(34467);
  ret = formats ? formats.length : 0;
  break;
 }
 if (ret === undefined) {
  var result = GLctx.getParameter(name_);
  switch (typeof result) {
  case "number":
   ret = result;
   break;

  case "boolean":
   ret = result ? 1 : 0;
   break;

  case "string":
   GL.recordError(1280);
   return;

  case "object":
   if (result === null) {
    switch (name_) {
    case 34964:
    case 35725:
    case 34965:
    case 36006:
    case 36007:
    case 32873:
    case 34229:
    case 34068:
     {
      ret = 0;
      break;
     }

    default:
     {
      GL.recordError(1280);
      return;
     }
    }
   } else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
    for (var i = 0; i < result.length; ++i) {
     switch (type) {
     case 0:
      HEAP32[p + i * 4 >> 2] = result[i];
      break;

     case 2:
      HEAPF32[p + i * 4 >> 2] = result[i];
      break;

     case 4:
      HEAP8[p + i >> 0] = result[i] ? 1 : 0;
      break;
     }
    }
    return;
   } else {
    try {
     ret = result.name | 0;
    } catch (e) {
     GL.recordError(1280);
     err("GL_INVALID_ENUM in glGet" + type + "v: Unknown object returned from WebGL getParameter(" + name_ + ")! (error: " + e + ")");
     return;
    }
   }
   break;

  default:
   GL.recordError(1280);
   err("GL_INVALID_ENUM in glGet" + type + "v: Native code calling glGet" + type + "v(" + name_ + ") and it returns " + result + " of type " + typeof result + "!");
   return;
  }
 }
 switch (type) {
 case 1:
  writeI53ToI64(p, ret);
  break;

 case 0:
  HEAP32[p >> 2] = ret;
  break;

 case 2:
  HEAPF32[p >> 2] = ret;
  break;

 case 4:
  HEAP8[p >> 0] = ret ? 1 : 0;
  break;
 }
}

function _glGetBooleanv(name_, p) {
 emscriptenWebGLGet(name_, p, 4);
}

function _glGetError() {
 var error = GLctx.getError() || GL.lastError;
 GL.lastError = 0;
 return error;
}

function _glGetIntegerv(name_, p) {
 emscriptenWebGLGet(name_, p, 0);
}

function _glGetProgramiv(program, pname, p) {
 if (!p) {
  GL.recordError(1281);
  return;
 }
 if (program >= GL.counter) {
  GL.recordError(1281);
  return;
 }
 program = GL.programs[program];
 if (pname == 35716) {
  var log = GLctx.getProgramInfoLog(program);
  if (log === null) log = "(unknown error)";
  HEAP32[p >> 2] = log.length + 1;
 } else if (pname == 35719) {
  if (!program.maxUniformLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35718); ++i) {
    program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length + 1);
   }
  }
  HEAP32[p >> 2] = program.maxUniformLength;
 } else if (pname == 35722) {
  if (!program.maxAttributeLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35721); ++i) {
    program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length + 1);
   }
  }
  HEAP32[p >> 2] = program.maxAttributeLength;
 } else if (pname == 35381) {
  if (!program.maxUniformBlockNameLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35382); ++i) {
    program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length + 1);
   }
  }
  HEAP32[p >> 2] = program.maxUniformBlockNameLength;
 } else {
  HEAP32[p >> 2] = GLctx.getProgramParameter(program, pname);
 }
}

function _glGetShaderiv(shader, pname, p) {
 if (!p) {
  GL.recordError(1281);
  return;
 }
 if (pname == 35716) {
  var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
  if (log === null) log = "(unknown error)";
  var logLength = log ? log.length + 1 : 0;
  HEAP32[p >> 2] = logLength;
 } else if (pname == 35720) {
  var source = GLctx.getShaderSource(GL.shaders[shader]);
  var sourceLength = source ? source.length + 1 : 0;
  HEAP32[p >> 2] = sourceLength;
 } else {
  HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname);
 }
}

var jstoi_q = str => parseInt(str);

function webglGetLeftBracePos(name) {
 return name.slice(-1) == "]" && name.lastIndexOf("[");
}

function webglPrepareUniformLocationsBeforeFirstUse(program) {
 var uniformLocsById = program.uniformLocsById, uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, i, j;
 if (!uniformLocsById) {
  program.uniformLocsById = uniformLocsById = {};
  program.uniformArrayNamesById = {};
  for (i = 0; i < GLctx.getProgramParameter(program, 35718); ++i) {
   var u = GLctx.getActiveUniform(program, i);
   var nm = u.name;
   var sz = u.size;
   var lb = webglGetLeftBracePos(nm);
   var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
   var id = program.uniformIdCounter;
   program.uniformIdCounter += sz;
   uniformSizeAndIdsByName[arrayName] = [ sz, id ];
   for (j = 0; j < sz; ++j) {
    uniformLocsById[id] = j;
    program.uniformArrayNamesById[id++] = arrayName;
   }
  }
 }
}

function _glGetUniformLocation(program, name) {
 name = UTF8ToString(name);
 if (program = GL.programs[program]) {
  webglPrepareUniformLocationsBeforeFirstUse(program);
  var uniformLocsById = program.uniformLocsById;
  var arrayIndex = 0;
  var uniformBaseName = name;
  var leftBrace = webglGetLeftBracePos(name);
  if (leftBrace > 0) {
   arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
   uniformBaseName = name.slice(0, leftBrace);
  }
  var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
  if (sizeAndId && arrayIndex < sizeAndId[0]) {
   arrayIndex += sizeAndId[1];
   if (uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name)) {
    return arrayIndex;
   }
  }
 } else {
  GL.recordError(1281);
 }
 return -1;
}

function _glLineWidth(x0) {
 GLctx.lineWidth(x0);
}

function _glLinkProgram(program) {
 program = GL.programs[program];
 GLctx.linkProgram(program);
 program.uniformLocsById = 0;
 program.uniformSizeAndIdsByName = {};
}

function _glMapBufferRange() {
 err("missing function: glMapBufferRange");
 abort(-1);
}

function _glPixelStorei(pname, param) {
 if (pname == 3317) {
  GL.unpackAlignment = param;
 }
 GLctx.pixelStorei(pname, param);
}

function computeUnpackAlignedImageSize(width, height, sizePerPixel, alignment) {
 function roundedToNextMultipleOf(x, y) {
  return x + y - 1 & -y;
 }
 var plainRowSize = width * sizePerPixel;
 var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
 return height * alignedRowSize;
}

function colorChannelsInGlTextureFormat(format) {
 var colorChannels = {
  5: 3,
  6: 4,
  8: 2,
  29502: 3,
  29504: 4
 };
 return colorChannels[format - 6402] || 1;
}

function heapObjectForWebGLType(type) {
 type -= 5120;
 if (type == 1) return HEAPU8;
 if (type == 4) return HEAP32;
 if (type == 6) return HEAPF32;
 if (type == 5 || type == 28922) return HEAPU32;
 return HEAPU16;
}

function heapAccessShiftForWebGLHeap(heap) {
 return 31 - Math.clz32(heap.BYTES_PER_ELEMENT);
}

function emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) {
 var heap = heapObjectForWebGLType(type);
 var shift = heapAccessShiftForWebGLHeap(heap);
 var byteSize = 1 << shift;
 var sizePerPixel = colorChannelsInGlTextureFormat(format) * byteSize;
 var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel, GL.unpackAlignment);
 return heap.subarray(pixels >> shift, pixels + bytes >> shift);
}

function _glReadPixels(x, y, width, height, format, type, pixels) {
 var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
 if (!pixelData) {
  GL.recordError(1280);
  return;
 }
 GLctx.readPixels(x, y, width, height, format, type, pixelData);
}

function _glScissor(x0, x1, x2, x3) {
 GLctx.scissor(x0, x1, x2, x3);
}

function _glShaderSource(shader, count, string, length) {
 var source = GL.getSource(shader, count, string, length);
 GLctx.shaderSource(GL.shaders[shader], source);
}

function _glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
 GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null);
}

function _glTexParameterf(x0, x1, x2) {
 GLctx.texParameterf(x0, x1, x2);
}

function _glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels) {
 var pixelData = null;
 if (pixels) pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0);
 GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
}

function webglGetUniformLocation(location) {
 var p = GLctx.currentProgram;
 if (p) {
  var webglLoc = p.uniformLocsById[location];
  if (typeof webglLoc == "number") {
   p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? "[" + webglLoc + "]" : ""));
  }
  return webglLoc;
 } else {
  GL.recordError(1282);
 }
}

function _glUniform1f(location, v0) {
 GLctx.uniform1f(webglGetUniformLocation(location), v0);
}

function _glUniform1i(location, v0) {
 GLctx.uniform1i(webglGetUniformLocation(location), v0);
}

var miniTempWebGLIntBuffers = [];

function _glUniform1iv(location, count, value) {
 if (count <= 288) {
  var view = miniTempWebGLIntBuffers[count - 1];
  for (var i = 0; i < count; ++i) {
   view[i] = HEAP32[value + 4 * i >> 2];
  }
 } else {
  var view = HEAP32.subarray(value >> 2, value + count * 4 >> 2);
 }
 GLctx.uniform1iv(webglGetUniformLocation(location), view);
}

var miniTempWebGLFloatBuffers = [];

function _glUniform4fv(location, count, value) {
 if (count <= 72) {
  var view = miniTempWebGLFloatBuffers[4 * count - 1];
  var heap = HEAPF32;
  value >>= 2;
  for (var i = 0; i < 4 * count; i += 4) {
   var dst = value + i;
   view[i] = heap[dst];
   view[i + 1] = heap[dst + 1];
   view[i + 2] = heap[dst + 2];
   view[i + 3] = heap[dst + 3];
  }
 } else {
  var view = HEAPF32.subarray(value >> 2, value + count * 16 >> 2);
 }
 GLctx.uniform4fv(webglGetUniformLocation(location), view);
}

function _glUniformMatrix4fv(location, count, transpose, value) {
 if (count <= 18) {
  var view = miniTempWebGLFloatBuffers[16 * count - 1];
  var heap = HEAPF32;
  value >>= 2;
  for (var i = 0; i < 16 * count; i += 16) {
   var dst = value + i;
   view[i] = heap[dst];
   view[i + 1] = heap[dst + 1];
   view[i + 2] = heap[dst + 2];
   view[i + 3] = heap[dst + 3];
   view[i + 4] = heap[dst + 4];
   view[i + 5] = heap[dst + 5];
   view[i + 6] = heap[dst + 6];
   view[i + 7] = heap[dst + 7];
   view[i + 8] = heap[dst + 8];
   view[i + 9] = heap[dst + 9];
   view[i + 10] = heap[dst + 10];
   view[i + 11] = heap[dst + 11];
   view[i + 12] = heap[dst + 12];
   view[i + 13] = heap[dst + 13];
   view[i + 14] = heap[dst + 14];
   view[i + 15] = heap[dst + 15];
  }
 } else {
  var view = HEAPF32.subarray(value >> 2, value + count * 64 >> 2);
 }
 GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
}

function _glUnmapBuffer() {
 err("missing function: glUnmapBuffer");
 abort(-1);
}

function _glUseProgram(program) {
 program = GL.programs[program];
 GLctx.useProgram(program);
 GLctx.currentProgram = program;
}

function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
 var cb = GL.currentContext.clientBuffers[index];
 if (!GLctx.currentArrayBufferBinding) {
  cb.size = size;
  cb.type = type;
  cb.normalized = normalized;
  cb.stride = stride;
  cb.ptr = ptr;
  cb.clientside = true;
  cb.vertexAttribPointerAdaptor = function(index, size, type, normalized, stride, ptr) {
   this.vertexAttribPointer(index, size, type, normalized, stride, ptr);
  };
  return;
 }
 cb.clientside = false;
 GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
}

function _glViewport(x0, x1, x2, x3) {
 GLctx.viewport(x0, x1, x2, x3);
}

var arraySum = (array, index) => {
 var sum = 0;
 for (var i = 0; i <= index; sum += array[i++]) {}
 return sum;
};

var MONTH_DAYS_LEAP = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var MONTH_DAYS_REGULAR = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var addDays = (date, days) => {
 var newDate = new Date(date.getTime());
 while (days > 0) {
  var leap = isLeapYear(newDate.getFullYear());
  var currentMonth = newDate.getMonth();
  var daysInCurrentMonth = (leap ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[currentMonth];
  if (days > daysInCurrentMonth - newDate.getDate()) {
   days -= daysInCurrentMonth - newDate.getDate() + 1;
   newDate.setDate(1);
   if (currentMonth < 11) {
    newDate.setMonth(currentMonth + 1);
   } else {
    newDate.setMonth(0);
    newDate.setFullYear(newDate.getFullYear() + 1);
   }
  } else {
   newDate.setDate(newDate.getDate() + days);
   return newDate;
  }
 }
 return newDate;
};

var writeArrayToMemory = (array, buffer) => {
 HEAP8.set(array, buffer);
};

var _strftime = (s, maxsize, format, tm) => {
 var tm_zone = HEAP32[tm + 40 >> 2];
 var date = {
  tm_sec: HEAP32[tm >> 2],
  tm_min: HEAP32[tm + 4 >> 2],
  tm_hour: HEAP32[tm + 8 >> 2],
  tm_mday: HEAP32[tm + 12 >> 2],
  tm_mon: HEAP32[tm + 16 >> 2],
  tm_year: HEAP32[tm + 20 >> 2],
  tm_wday: HEAP32[tm + 24 >> 2],
  tm_yday: HEAP32[tm + 28 >> 2],
  tm_isdst: HEAP32[tm + 32 >> 2],
  tm_gmtoff: HEAP32[tm + 36 >> 2],
  tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
 };
 var pattern = UTF8ToString(format);
 var EXPANSION_RULES_1 = {
  "%c": "%a %b %d %H:%M:%S %Y",
  "%D": "%m/%d/%y",
  "%F": "%Y-%m-%d",
  "%h": "%b",
  "%r": "%I:%M:%S %p",
  "%R": "%H:%M",
  "%T": "%H:%M:%S",
  "%x": "%m/%d/%y",
  "%X": "%H:%M:%S",
  "%Ec": "%c",
  "%EC": "%C",
  "%Ex": "%m/%d/%y",
  "%EX": "%H:%M:%S",
  "%Ey": "%y",
  "%EY": "%Y",
  "%Od": "%d",
  "%Oe": "%e",
  "%OH": "%H",
  "%OI": "%I",
  "%Om": "%m",
  "%OM": "%M",
  "%OS": "%S",
  "%Ou": "%u",
  "%OU": "%U",
  "%OV": "%V",
  "%Ow": "%w",
  "%OW": "%W",
  "%Oy": "%y"
 };
 for (var rule in EXPANSION_RULES_1) {
  pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
 }
 var WEEKDAYS = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
 var MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
 function leadingSomething(value, digits, character) {
  var str = typeof value == "number" ? value.toString() : value || "";
  while (str.length < digits) {
   str = character[0] + str;
  }
  return str;
 }
 function leadingNulls(value, digits) {
  return leadingSomething(value, digits, "0");
 }
 function compareByDay(date1, date2) {
  function sgn(value) {
   return value < 0 ? -1 : value > 0 ? 1 : 0;
  }
  var compare;
  if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
   if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
    compare = sgn(date1.getDate() - date2.getDate());
   }
  }
  return compare;
 }
 function getFirstWeekStartDate(janFourth) {
  switch (janFourth.getDay()) {
  case 0:
   return new Date(janFourth.getFullYear() - 1, 11, 29);

  case 1:
   return janFourth;

  case 2:
   return new Date(janFourth.getFullYear(), 0, 3);

  case 3:
   return new Date(janFourth.getFullYear(), 0, 2);

  case 4:
   return new Date(janFourth.getFullYear(), 0, 1);

  case 5:
   return new Date(janFourth.getFullYear() - 1, 11, 31);

  case 6:
   return new Date(janFourth.getFullYear() - 1, 11, 30);
  }
 }
 function getWeekBasedYear(date) {
  var thisDate = addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
  var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
  var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
  var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
  var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
   if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
    return thisDate.getFullYear() + 1;
   }
   return thisDate.getFullYear();
  }
  return thisDate.getFullYear() - 1;
 }
 var EXPANSION_RULES_2 = {
  "%a": date => WEEKDAYS[date.tm_wday].substring(0, 3),
  "%A": date => WEEKDAYS[date.tm_wday],
  "%b": date => MONTHS[date.tm_mon].substring(0, 3),
  "%B": date => MONTHS[date.tm_mon],
  "%C": date => {
   var year = date.tm_year + 1900;
   return leadingNulls(year / 100 | 0, 2);
  },
  "%d": date => leadingNulls(date.tm_mday, 2),
  "%e": date => leadingSomething(date.tm_mday, 2, " "),
  "%g": date => {
   return getWeekBasedYear(date).toString().substring(2);
  },
  "%G": date => getWeekBasedYear(date),
  "%H": date => leadingNulls(date.tm_hour, 2),
  "%I": date => {
   var twelveHour = date.tm_hour;
   if (twelveHour == 0) twelveHour = 12; else if (twelveHour > 12) twelveHour -= 12;
   return leadingNulls(twelveHour, 2);
  },
  "%j": date => {
   return leadingNulls(date.tm_mday + arraySum(isLeapYear(date.tm_year + 1900) ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, date.tm_mon - 1), 3);
  },
  "%m": date => leadingNulls(date.tm_mon + 1, 2),
  "%M": date => leadingNulls(date.tm_min, 2),
  "%n": () => "\n",
  "%p": date => {
   if (date.tm_hour >= 0 && date.tm_hour < 12) {
    return "AM";
   }
   return "PM";
  },
  "%S": date => leadingNulls(date.tm_sec, 2),
  "%t": () => "\t",
  "%u": date => date.tm_wday || 7,
  "%U": date => {
   var days = date.tm_yday + 7 - date.tm_wday;
   return leadingNulls(Math.floor(days / 7), 2);
  },
  "%V": date => {
   var val = Math.floor((date.tm_yday + 7 - (date.tm_wday + 6) % 7) / 7);
   if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
    val++;
   }
   if (!val) {
    val = 52;
    var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
    if (dec31 == 4 || dec31 == 5 && isLeapYear(date.tm_year % 400 - 1)) {
     val++;
    }
   } else if (val == 53) {
    var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
    if (jan1 != 4 && (jan1 != 3 || !isLeapYear(date.tm_year))) val = 1;
   }
   return leadingNulls(val, 2);
  },
  "%w": date => date.tm_wday,
  "%W": date => {
   var days = date.tm_yday + 7 - (date.tm_wday + 6) % 7;
   return leadingNulls(Math.floor(days / 7), 2);
  },
  "%y": date => {
   return (date.tm_year + 1900).toString().substring(2);
  },
  "%Y": date => date.tm_year + 1900,
  "%z": date => {
   var off = date.tm_gmtoff;
   var ahead = off >= 0;
   off = Math.abs(off) / 60;
   off = off / 60 * 100 + off % 60;
   return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
  },
  "%Z": date => date.tm_zone,
  "%%": () => "%"
 };
 pattern = pattern.replace(/%%/g, "\0\0");
 for (var rule in EXPANSION_RULES_2) {
  if (pattern.includes(rule)) {
   pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
  }
 }
 pattern = pattern.replace(/\0\0/g, "%");
 var bytes = intArrayFromString(pattern, false);
 if (bytes.length > maxsize) {
  return 0;
 }
 writeArrayToMemory(bytes, s);
 return bytes.length - 1;
};

Module["requestFullscreen"] = function Module_requestFullscreen(lockPointer, resizeCanvas) {
 Browser.requestFullscreen(lockPointer, resizeCanvas);
};

Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) {
 Browser.requestAnimationFrame(func);
};

Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) {
 Browser.setCanvasSize(width, height, noUpdates);
};

Module["pauseMainLoop"] = function Module_pauseMainLoop() {
 Browser.mainLoop.pause();
};

Module["resumeMainLoop"] = function Module_resumeMainLoop() {
 Browser.mainLoop.resume();
};

Module["getUserMedia"] = function Module_getUserMedia() {
 Browser.getUserMedia();
};

Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
 return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes);
};

var preloadedImages = {};

var preloadedAudios = {};

var FSNode = function(parent, name, mode, rdev) {
 if (!parent) {
  parent = this;
 }
 this.parent = parent;
 this.mount = parent.mount;
 this.mounted = null;
 this.id = FS.nextInode++;
 this.name = name;
 this.mode = mode;
 this.node_ops = {};
 this.stream_ops = {};
 this.rdev = rdev;
};

var readMode = 292 | 73;

var writeMode = 146;

Object.defineProperties(FSNode.prototype, {
 read: {
  get: function() {
   return (this.mode & readMode) === readMode;
  },
  set: function(val) {
   val ? this.mode |= readMode : this.mode &= ~readMode;
  }
 },
 write: {
  get: function() {
   return (this.mode & writeMode) === writeMode;
  },
  set: function(val) {
   val ? this.mode |= writeMode : this.mode &= ~writeMode;
  }
 },
 isFolder: {
  get: function() {
   return FS.isDir(this.mode);
  }
 },
 isDevice: {
  get: function() {
   return FS.isChrdev(this.mode);
  }
 }
});

FS.FSNode = FSNode;

FS.createPreloadedFile = FS_createPreloadedFile;

FS.staticInit();

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS_unlink"] = FS.unlink;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createDevice"] = FS.createDevice;

var GLctx;

embind_init_charCodes();

BindingError = Module["BindingError"] = extendError(Error, "BindingError");

InternalError = Module["InternalError"] = extendError(Error, "InternalError");

init_emval();

Fetch.init();

var miniTempWebGLIntBuffersStorage = new Int32Array(288);

for (var i = 0; i < 288; ++i) {
 miniTempWebGLIntBuffers[i] = miniTempWebGLIntBuffersStorage.subarray(0, i + 1);
}

var miniTempWebGLFloatBuffersStorage = new Float32Array(288);

for (var i = 0; i < 288; ++i) {
 miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i + 1);
}

var wasmImports = {
 "rb": _SDL_GL_SwapBuffers,
 "qb": _SDL_Init,
 "qa": _SDL_PollEvent,
 "pb": _SDL_SetVideoMode,
 "ob": WASM_Fullscreen,
 "nb": WASM_GetBrowserHeight,
 "mb": WASM_GetBrowserWidth,
 "lb": WASM_GetViewportHeight,
 "kb": WASM_GetViewportWidth,
 "jb": WASM_JSInit,
 "ib": WASM_JSViewportUpdate,
 "M": WASM_get_CanvasPosY,
 "a": ___assert_fail,
 "p": ___cxa_find_matching_catch_2,
 "L": ___cxa_throw,
 "K": ___resumeException,
 "pa": ___syscall_fcntl64,
 "hb": ___syscall_ioctl,
 "gb": ___syscall_openat,
 "ra": __embind_register_bigint,
 "cb": __embind_register_bool,
 "bb": __embind_register_emval,
 "ma": __embind_register_float,
 "h": __embind_register_integer,
 "b": __embind_register_memory_view,
 "la": __embind_register_std_string,
 "J": __embind_register_std_wstring,
 "ab": __embind_register_void,
 "$a": __emscripten_fetch_free,
 "_a": __emscripten_throw_longjmp,
 "Za": __localtime_js,
 "Ya": __tzset_js,
 "ka": _abort,
 "ja": _alBufferData,
 "ia": _alDeleteBuffers,
 "ha": _alDeleteSources,
 "D": _alGenBuffers,
 "ga": _alGenSources,
 "u": _alGetEnumValue,
 "I": _alGetError,
 "j": _alGetSourcei,
 "fa": _alListenerf,
 "Xa": _alSourcePause,
 "H": _alSourcePlay,
 "ea": _alSourceQueueBuffers,
 "Wa": _alSourceRewind,
 "C": _alSourceStop,
 "da": _alSourceUnqueueBuffers,
 "B": _alSourcef,
 "o": _alSourcei,
 "Va": _alcCloseDevice,
 "Ua": _alcCreateContext,
 "Ta": _alcDestroyContext,
 "Sa": _alcMakeContextCurrent,
 "Ra": _alcOpenDevice,
 "Qa": _emscripten_asm_const_int,
 "ca": _emscripten_date_now,
 "Pa": _emscripten_is_main_browser_thread,
 "Oa": _emscripten_memcpy_big,
 "Na": _emscripten_resize_heap,
 "ba": _emscripten_run_script_int,
 "Ma": _emscripten_set_main_loop,
 "La": _emscripten_start_fetch,
 "fb": _environ_get,
 "eb": _environ_sizes_get,
 "Ka": _exit,
 "oa": _fd_close,
 "db": _fd_read,
 "sa": _fd_seek,
 "na": _fd_write,
 "t": _glActiveTexture,
 "aa": _glAttachShader,
 "f": _glBindBuffer,
 "Ja": _glBindBufferBase,
 "$": _glBindFramebuffer,
 "i": _glBindTexture,
 "s": _glBlendFunc,
 "Ia": _glClear,
 "Ha": _glClearColor,
 "_": _glCompileShader,
 "Ga": _glCompressedTexImage2D,
 "Fa": _glCreateProgram,
 "Z": _glCreateShader,
 "Y": _glDeleteProgram,
 "n": _glDeleteShader,
 "Ea": _glDeleteTextures,
 "m": _glDisable,
 "X": _glDisableVertexAttribArray,
 "g": _glDrawArrays,
 "Da": _glDrawElements,
 "A": _glEnable,
 "Ca": _glEnableVertexAttribArray,
 "G": _glGenTextures,
 "W": _glGetAttribLocation,
 "V": _glGetBooleanv,
 "U": _glGetError,
 "z": _glGetIntegerv,
 "Ba": _glGetProgramiv,
 "y": _glGetShaderiv,
 "e": _glGetUniformLocation,
 "T": _glLineWidth,
 "Aa": _glLinkProgram,
 "r": _glMapBufferRange,
 "F": _glPixelStorei,
 "za": _glReadPixels,
 "x": _glScissor,
 "S": _glShaderSource,
 "R": _glTexImage2D,
 "d": _glTexParameterf,
 "ya": _glTexSubImage2D,
 "xa": _glUniform1f,
 "Q": _glUniform1i,
 "wa": _glUniform1iv,
 "P": _glUniform4fv,
 "w": _glUniformMatrix4fv,
 "q": _glUnmapBuffer,
 "v": _glUseProgram,
 "c": _glVertexAttribPointer,
 "E": _glViewport,
 "va": invoke_iii,
 "O": invoke_iiii,
 "ua": invoke_iiiii,
 "l": invoke_vi,
 "ta": invoke_vii,
 "k": invoke_viii,
 "N": _strftime
};

var asm = createWasm();

var ___wasm_call_ctors = function() {
 return (___wasm_call_ctors = Module["asm"]["tb"]).apply(null, arguments);
};

var _main = Module["_main"] = function() {
 return (_main = Module["_main"] = Module["asm"]["ub"]).apply(null, arguments);
};

var _memcpy = function() {
 return (_memcpy = Module["asm"]["wb"]).apply(null, arguments);
};

var ___errno_location = function() {
 return (___errno_location = Module["asm"]["xb"]).apply(null, arguments);
};

var _malloc = function() {
 return (_malloc = Module["asm"]["yb"]).apply(null, arguments);
};

var _free = function() {
 return (_free = Module["asm"]["zb"]).apply(null, arguments);
};

var setTempRet0 = function() {
 return (setTempRet0 = Module["asm"]["Ab"]).apply(null, arguments);
};

var ___getTypeName = function() {
 return (___getTypeName = Module["asm"]["__getTypeName"]).apply(null, arguments);
};

var __embind_initialize_bindings = Module["__embind_initialize_bindings"] = function() {
 return (__embind_initialize_bindings = Module["__embind_initialize_bindings"] = Module["asm"]["Bb"]).apply(null, arguments);
};

var _setThrew = function() {
 return (_setThrew = Module["asm"]["Cb"]).apply(null, arguments);
};

var stackSave = function() {
 return (stackSave = Module["asm"]["Db"]).apply(null, arguments);
};

var stackRestore = function() {
 return (stackRestore = Module["asm"]["Eb"]).apply(null, arguments);
};

var ___cxa_can_catch = function() {
 return (___cxa_can_catch = Module["asm"]["Fb"]).apply(null, arguments);
};

var ___cxa_is_pointer_type = function() {
 return (___cxa_is_pointer_type = Module["asm"]["Gb"]).apply(null, arguments);
};

var ___start_em_js = Module["___start_em_js"] = 311704;

var ___stop_em_js = Module["___stop_em_js"] = 313277;

function invoke_viii(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiii(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vi(index, a1) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vii(index, a1, a2) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iii(index, a1, a2) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

Module["addRunDependency"] = addRunDependency;

Module["removeRunDependency"] = removeRunDependency;

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createDevice"] = FS.createDevice;

Module["FS_unlink"] = FS.unlink;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

var calledRun;

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function callMain() {
 var entryFunction = _main;
 var argc = 0;
 var argv = 0;
 try {
  var ret = entryFunction(argc, argv);
  exitJS(ret, true);
  return ret;
 } catch (e) {
  return handleException(e);
 }
}

function run() {
 if (runDependencies > 0) {
  return;
 }
 preRun();
 if (runDependencies > 0) {
  return;
 }
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  preMain();
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  if (shouldRunNow) callMain();
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout(function() {
   setTimeout(function() {
    Module["setStatus"]("");
   }, 1);
   doRun();
  }, 1);
 } else {
  doRun();
 }
}

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

var shouldRunNow = true;

if (Module["noInitialRun"]) shouldRunNow = false;

run();
