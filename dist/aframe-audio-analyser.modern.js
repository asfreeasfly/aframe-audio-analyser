if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");var t={};AFRAME.registerComponent("audioanalyser",{schema:{buffer:{default:!1},beatStartCutoff:{default:.8},beatEndCutoff:{default:.75},cache:{default:!1},enabled:{default:!0},enableBeatDetection:{default:!0},enableLevels:{default:!0},enableWaveform:{default:!0},enableVolume:{default:!0},fftSize:{default:2048},smoothingTimeConstant:{default:.8},src:{parse:function(t){return t.constructor!==String?t:t.startsWith("#")||t.startsWith(".")?document.querySelector(t):t}},unique:{default:!1}},init:function(){this.audioEl=null,this.levels=null,this.waveform=null,this.volume=0,this.xhr=null,this.beat_low=!1,this.beat_mid=!1,this.beat_high=!1,this.beat_low_max=20,this.beat_mid_max=20,this.beat_high_max=20,this.initContext()},update:function(t){const e=this.analyser,i=this.data;t.fftSize===i.fftSize&&t.smoothingTimeConstant===i.smoothingTimeConstant||(e.fftSize=i.fftSize,e.smoothingTimeConstant=i.smoothingTimeConstant,this.levels=new Uint8Array(e.frequencyBinCount),this.waveform=new Uint8Array(e.fftSize)),i.src&&this.refreshSource()},tick:function(){const t=this.data;if(t.enabled){if((t.enableLevels||t.enableVolume)&&this.analyser.getByteFrequencyData(this.levels),t.enableWaveform&&this.analyser.getByteTimeDomainData(this.waveform),t.enableVolume||t.enableBeatDetection){for(var e=0,i=0;i<this.levels.length;i++)e+=this.levels[i];this.volume=e/this.levels.length}if(t.enableBeatDetection){var n=this.beatInRange(1,350,this.beat_low,this.beat_low_max,"audioanalyser-beat-low");this.beat_low=n[0],this.beat_low_max=n[1],n=this.beatInRange(500,2e3,this.beat_mid,this.beat_mid_max,"audioanalyser-beat-mid"),this.beat_mid=n[0],this.beat_mid_max=n[1],n=this.beatInRange(4e3,1e4,this.beat_high,this.beat_high_max,"audioanalyser-beat-high"),this.beat_high=n[0],this.beat_high_max=n[1]}}},beatInRange:function(t,e,i,n,s){const a=this.levels.length,o=Math.floor(t/23600*a),r=Math.floor(e/23600*a),h=this.levels.slice(o,r),c=h.reduce((t,e)=>t+e)/h.length;return c>=(n=Math.max(c,n))*this.data.beatStartCutoff&&0==i?(this.el.emit(s,null,!1),[!0,n]):c<n*this.data.beatEndCutoff&&1==i?[!1,n]:[i,n]},initContext:function(){const t=this.data;this.context=new(window.webkitAudioContext||window.AudioContext);const e=this.analyser=this.context.createAnalyser();(this.gainNode=this.context.createGain()).connect(e),e.connect(this.context.destination),e.fftSize=t.fftSize,e.smoothingTimeConstant=t.smoothingTimeConstant,this.levels=new Uint8Array(e.frequencyBinCount),this.waveform=new Uint8Array(e.fftSize)},refreshSource:function(){const t=this.data;t.buffer&&t.src.constructor===String?this.getBufferSource().then(t=>{this.source=t,this.source.connect(this.gainNode)}):(this.source=this.getMediaSource(),this.source.connect(this.gainNode))},suspendContext:function(){this.context.suspend()},resumeContext:function(){this.context.resume()},fetchAudioBuffer:function(e){return t[e]?t[e].constructor===Promise?t[e]:Promise.resolve(t[e]):(this.data.cache||Object.keys(t).forEach(function(e){delete t[e]}),t[e]=new Promise(i=>{const n=this.xhr=new XMLHttpRequest;n.open("GET",e),n.responseType="arraybuffer",n.addEventListener("load",()=>{function s(n){t[e]=n,i(n)}const a=this.context.decodeAudioData(n.response,s);a&&a.constructor===Promise&&a.then(s).catch(console.error)}),n.send()}),t[e])},getBufferSource:function(){const e=this.data;return this.fetchAudioBuffer(e.src).then(()=>{const i=this.context.createBufferSource();return i.buffer=t[e.src],this.el.emit("audioanalyserbuffersource",i,!1),i}).catch(console.error)},getMediaSource:function(){const t={};return function(){const e=this.data.src.constructor===String?this.data.src:this.data.src.src;if(t[e])return t[e];this.data.src.constructor===String?(this.audio=document.createElement("audio"),this.audio.crossOrigin="anonymous",this.audio.setAttribute("src",this.data.src)):this.audio=this.data.src;const i=this.context.createMediaElementSource(this.audio);return t[e]=i,i}}()});
//# sourceMappingURL=aframe-audio-analyser.modern.js.map
