(() => {
  const PAPER = '#f8f6ed', INK = '#202725', LIME = '#daf26d', BLUE = '#78a7e8', CORAL = '#ff8b70';

  const line = (pts, sw, col, br = 'ink', curv = .5) => {
    const path = pts.length === 2 ? [pts[0], [(pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2], pts[1]] : pts;
    inkLine(path, sw, col, br, curv);
  };  const back = () => paint(rectPts(-20, -20, W + 40, H + 40), { wash: PAPER, ink: null });
  const dot = (x, y, r, col) => paint(ellPts(x, y, r, r, 12, 1), { wash: col, ink: INK, sw: 1 });
  const spark = (x, y, r, col) => paint(starPts(x, y, r, .25, 4), { wash: col, ink: INK, sw: 1 });
  function voice(t, lt) {
    back();
    camBegin(960, 540, 1 + .025 * lt);
    paint(rrPts(250, 305, 205, 360, 95, 1.5), { wash: BLUE, ink: INK, sw: 3 });
    line([[353, 665], [353, 805], [280, 808], [435, 808]], 3, INK);
    for (let i = 0; i < 7; i++) line([[302, 390 + i * 37], [405, 390 + i * 37]], 1.1, INK, 'HB');
    const pts = [];
    for (let i = 0; i <= 32; i++) {
      const x = 520 + i * 26;
      const amp = 25 + 105 * Math.exp(-Math.pow((x - 950) / 330, 2));
      pts.push([x, 535 + Math.sin(i * .8 - lt * 8) * amp]);
    }
    line(pts, 3, INK, 'ink');
    for (let i = 0; i < 3; i++) dot(765 + i * 235, 295 + Math.sin(t * 5 + i) * 15, 36, i === 1 ? LIME : BLUE);
    paint(ellPts(1590, 535, 132, 180, 28, 1.5), { wash: '#f1efe4', ink: INK, sw: 3 });
    paint(ellPts(1590, 535, 82, 118, 28, 1), { wash: BLUE, ink: INK, sw: 2 });
    paint(ellPts(1590, 535, 40, 60, 24), { wash: INK, ink: null });
    spark(1770, 280, 48, LIME);
    camEnd();
  }
  function legal(t, lt) {
    back();
    camBegin(960, 540, 1 + .03 * lt);
    paint([[265, 330], [720, 280], [920, 350], [920, 790], [700, 720], [265, 770]], { wash: '#fffdf2', ink: INK, sw: 2.6 });
    paint([[920, 350], [1120, 280], [1580, 330], [1580, 770], [1140, 720], [920, 790]], { wash: '#fffdf2', ink: INK, sw: 2.6 });
    line([[920, 350], [920, 790]], 2.4, INK);
    for (let i = 0; i < 4; i++) {
      line([[355, 415 + i * 72], [745 - i * 20, 395 + i * 74]], 1.3, '#7b8b83', 'HB');
      line([[1080 + i * 5, 395 + i * 74], [1475, 418 + i * 72]], 1.3, '#7b8b83', 'HB');
    }
    const x = 950 + ease(seg(lt, .2, 1.7)) * 405;
    paint(ellPts(x, 275, 76, 76, 28, 1), { wash: BLUE, ink: INK, sw: 2.6 });
    line([[x + 52, 330], [x + 115, 405]], 3, INK);
    for (let i = 0; i < 5; i++) dot(540 + i * 178, 190 + Math.sin(i + t * 4) * 15, 9, CORAL);
    spark(1600, 220, 48, LIME);
    camEnd();
  }
  function mobile(t, lt) {
    back();
    camBegin(960, 540, 1 + .02 * lt);
    const bob = Math.sin(t * 5) * 8;
    paint(rrPts(620, 170 + bob, 680, 760, 55, 2), { wash: '#fffdf2', ink: INK, sw: 3.1 });
    line([[845, 207 + bob], [1075, 207 + bob]], 2.3, INK);
    paint(rrPts(685, 275 + bob, 550, 142, 18), { wash: LIME, ink: INK, sw: 2 });
    for (let i = 0; i < 3; i++) {
      const x = 690 + i * 181;
      const yy = 475 + bob + (1 - ease(seg(lt, .15 + i * .2, 1.2 + i * .2))) * 120;
      paint(rrPts(x, yy, 160, 240, 16), { wash: i === 1 ? BLUE : '#e7e9d8', ink: INK, sw: 1.8 });
      line([[x + 28, yy + 160], [x + 127, yy + 160]], 1.3, INK, 'HB');
    }
    dot(910, 845 + bob, 15, INK);
    line([[320, 490], [400, 410], [520, 440]], 2.7, CORAL);
    line([[1390, 660], [1510, 570], [1630, 590]], 2.7, BLUE);
    spark(1460, 275, 55, LIME);
    spark(390, 730, 32, CORAL);
    camEnd();
  }
  chapter('work', 6, 12, [[6, voice], [8, legal], [10, mobile]]);
})();
