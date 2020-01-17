function check(p) {
  var i;
  var ks = new Array();
  var o = {};
  for (var k in p) {
    ks.push(k.toLowerCase());
    o[k.toLowerCase()] = p[k];
  }
  p = null;
  ks.sort();
  var s0 = "";
  for (i = 0; i < ks.length; i++) {
    var v = o[ks[i]];
    s0 += v;
  }
  if (s0.length < 8) {
    s0 += "0123456789012345";
  }

  var s1 = new Array();
  for (i = 0; i < s0.length; i++) {
    s1.push(s0.charCodeAt(i));
  }

  for (i = 0; i < parseInt(s1.length / 8) - 1; i++) {
    for (var j = 0; j < 8; j++) {
      if ((i + 1) * 8 + j < s1.length)
        s1[j] ^= s1[(i + 1) * 8 + j];
    }
  }

  var hex_tab = [57.5, 63, 24, 16.5, 50.5, 32, 26.5, 17.5, 49.5, 18, 28, 18.5, 57, 47, 27, 19]; //s~0!e@5#c$8%r^6&
  var haxTab = "";
  for (var i = 0; i < hex_tab.length; i++) {
    haxTab += String.fromCharCode(hex_tab[i] * 2);
  }
  hex_tab = haxTab;
  s0 = "";
  var sum = 0;
  for (var i = 0; i < 8; i++) {
    var a = hex_tab.charAt((s1[i] >>> 3) & 0xF) + hex_tab.charAt(s1[i] & 0xF);
    sum += a.charCodeAt(0);
    s0 += a;
  }
  s0 += hex_tab.charAt(sum % 16);
  s0 += hex_tab.charAt(sum % 13);
  // o.r = hex_md5(s0);
  return s0;
}

export default check