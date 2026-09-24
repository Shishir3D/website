(() => {
  const PAPER = '#f8f6ed', INK = '#202725', LIME = '#daf26d', BLUE = '#78a7e8', CORAL = '#ff8b70';

  const line = (pts, sw, col, br = 'ink', curv = .5) => {
    const path = pts.length === 2 ? [pts[0], [(pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2], pts[1]] : pts;
    inkLine(path, sw, col, br, curv);
  };
  const back = () => paint(rectPts(-20, -20, W + 40, H + 40), { wash: PAPER, ink: null });
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
  function support(t, lt) {
    back();
    camBegin(960 + Math.sin(lt * 1.3) * 15, 540, 1 + .045 * ease(seg(lt, 0, 3)));
    paint(ellPts(410, 405, 84, 84, 28, 1), { wash: BLUE, ink: INK, sw: 2.7 });
    paint(rrPts(270, 520, 290, 270, 95, 1), { wash: '#e8ecdf', ink: INK, sw: 2.7 });
    dot(380, 400, 7, INK); dot(445, 400, 7, INK);
    line([[380, 445], [410, 457], [445, 445]], 1.8, INK);
    const ask = ease(seg(lt, .15, .85));
    paint(rrPts(515 + (1 - ask) * 100, 255, 340, 185, 36, 1), { wash: '#fffdf3', ink: INK, sw: 2.5 });
    line([[595, 335], [680, 335], [785, 335]], 2, '#7a8b80', 'HB');
    line([[595, 382], [730, 382]], 1.8, '#7a8b80', 'HB');
    paint(rrPts(1100, 270, 440, 555, 35, 1), { wash: '#e7e9d8', ink: INK, sw: 3 });
    for (let i = 0; i < 3; i++) {
      const y = 355 + i * 130;
      paint(rrPts(1150, y, 340, 95, 14), { wash: '#fffdf3', ink: INK, sw: 1.7 });
      dot(1220, y + 48, 17, i === 1 ? LIME : BLUE);
      line([[1270, y + 48], [1415, y + 48]], 1.5, INK, 'HB');
    }
    paint(rrPts(1240, 190, 170, 115, 18), { wash: LIME, ink: INK, sw: 2.6 });
    paint(rrPts(1295, 217, 60, 60, 8), { wash: '#fffdf3', ink: INK, sw: 1.5 });
    line([[855, 360], [980, 330], [1090, 330]], 2.2, INK, 'inkfine');
    for (let i = 0; i < 5; i++) {
      const phase = (lt * .4 + i * .2) % 1;
      dot(875 + phase * 205, 358 - Math.sin(phase * Math.PI) * 28, 9, i % 2 ? CORAL : BLUE);
    }
    const reply = ease(seg(lt, 1.3, 2.4));
    paint(rrPts(720, 630 - 72 * reply, 310, 145, 35), { wash: LIME, ink: INK, sw: 2.4 });
    line([[800, 645 - 72 * reply], [925, 645 - 72 * reply]], 1.8, INK, 'HB');
    line([[800, 690 - 72 * reply], [955, 690 - 72 * reply]], 1.8, INK, 'HB');
    spark(1620, 240, 35 + Math.sin(t * 5) * 5, CORAL);
    camEnd();
  }
  function mobile(t, lt) {
    back();
    camBegin(960 + Math.sin(lt * 1.4) * 15, 540, 1 + .045 * ease(seg(lt, 0, 4)));
    const bob = Math.sin(t * 3) * 7;
    paint(rrPts(620, 170 + bob, 680, 760, 55, 2), { wash: '#fffdf2', ink: INK, sw: 3.1 });
    line([[845, 207 + bob], [1075, 207 + bob]], 2.3, INK);
    paint(rrPts(685, 275 + bob, 550, 142, 18), { wash: LIME, ink: INK, sw: 2 });
    for (let i = 0; i < 3; i++) {
      const x = 690 + i * 181;
      const yy = 475 + bob + (1 - ease(seg(lt, .35 + i * .65, 1.3 + i * .65))) * 185;
      paint(rrPts(x, yy, 160, 240, 16), { wash: i === 1 ? BLUE : '#e7e9d8', ink: INK, sw: 1.8 });
      line([[x + 25, yy + 192], [x + 80, yy + 192], [x + 132, yy + 192]], 1.3, INK, 'HB');
      for (let b = 0; b < 3; b++) {
        const grow = ease(seg(lt, 1.4 + i * .38 + b * .2, 2.6 + i * .32 + b * .2));
        const h = (32 + b * 24) * grow;
        paint(rrPts(x + 28 + b * 39, yy + 168 - h, 22, h + 1, 6), { wash: b === 1 ? CORAL : LIME, ink: INK, sw: 1 });
      }
    }
    dot(910, 845 + bob, 15, INK);
    const rise = ease(seg(lt, 2.1, 3.6));
    line([[320, 650], [410, 590 - rise * 50], [520, 565 - rise * 95]], 2.7, CORAL);
    line([[1390, 720], [1510, 640 - rise * 80], [1630, 590 - rise * 105]], 2.7, BLUE);
    if (lt > 2.5) {
      const tap = ease(seg(lt, 2.5, 3.2));
      paint(ellPts(1215, 530 + bob, 18 + 48 * tap, 18 + 48 * tap, 24, 1), { wash: null, ink: CORAL, sw: 1.6 });
      dot(1215, 530 + bob, 15, CORAL);
    }
    spark(1460, 275, 55, LIME);
    spark(390, 730, 32, CORAL);
    camEnd();
  }
  chapter('work', 6, 16, [[6, voice], [9, support], [12, mobile]]);
})();
