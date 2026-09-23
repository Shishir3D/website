(() => {
  const PAPER = '#f8f6ed', INK = '#202725', LIME = '#daf26d', BLUE = '#78a7e8';

  const line = (pts, sw, col, br = 'ink', curv = .5) => {
    const path = pts.length === 2 ? [pts[0], [(pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2], pts[1]] : pts;
    inkLine(path, sw, col, br, curv);
  };  const back = () => {
    paint(rectPts(-20, -20, W + 40, H + 40), { wash: PAPER, ink: null });
    for (let i = 0; i < 11; i++) {
      const x = 100 + i * 178;
      line([[x, 90], [x + 5, 90]], 0.7, '#ccd0c3', 'HB');
      line([[x, 990], [x + 5, 990]], 0.7, '#ccd0c3', 'HB');
    }
  };
  const frog = (x, y, s, t, o = {}) => {
    push(); translate(x, y + (o.bounce || 0)); rotate(o.rot || 0);
    const swing = Math.sin(t * 5) * 0.12;
    paint(ellPts(-s * .33, -s * 2.4, s * .28, s * .29, 18, 1), { wash: LIME, ink: INK, sw: 2 });
    paint(ellPts(s * .33, -s * 2.4, s * .28, s * .29, 18, 1), { wash: LIME, ink: INK, sw: 2 });
    paint(ellPts(0, -s * 1.87, s * .66, s * .64, 24, 1.4), { wash: LIME, ink: INK, sw: 2.4 });
    paint(ellPts(-s * .25, -s * 2.38, s * .055, s * .08, 10), { wash: INK, ink: null });
    paint(ellPts(s * .25, -s * 2.38, s * .055, s * .08, 10), { wash: INK, ink: null });
    line([[-s * .22, -s * 1.72], [0, -s * 1.64], [s * .22, -s * 1.72]], 1.2, INK);
    line([[0, -s * 1.25], [0, -s * .52]], 2.6, INK, 'ink');
    line([[0, -s * 1.03], [-s * .7, -s * (.75 + swing)]], 2.4, INK);
    line([[0, -s * 1.03], [s * .7, -s * (.8 - swing)]], 2.4, INK);
    line([[0, -s * .52], [-s * .43, 0], [-s * .76, s * .08]], 2.4, INK);
    line([[0, -s * .52], [s * .43, 0], [s * .76, s * .08]], 2.4, INK);
    pop();
  };
  const star = (x, y, r, k = 1) => paint(starPts(x, y, r * k, .28, 4), { wash: LIME, ink: INK, sw: 1.3 });
  const well = (left, right, top, bottom) => {
    line([[left, top], [left - 12, bottom - 150], [left + 50, bottom]], 4, INK, 'ink');
    line([[right, top], [right + 12, bottom - 150], [right - 50, bottom]], 4, INK, 'ink');
    line([[left + 50, bottom], [(left + right) / 2, bottom + 40], [right - 50, bottom]], 3, INK, 'ink');
    line([[left - 40, top + 18], [left + 65, top], [left + 130, top + 8]], 3, INK);
    line([[right - 130, top + 8], [right - 65, top], [right + 40, top + 18]], 3, INK);
    for (let i = 0; i < 4; i++) {
      const yy = top + 105 + i * 135;
      line([[left - 8, yy], [left + 45, yy + 8]], 1.3, '#919b8d', 'HB');
      line([[right - 45, yy + 8], [right + 8, yy]], 1.3, '#919b8d', 'HB');
    }
  };
  function bottom(t, lt) {
    back();
    const zoom = 1 + .035 * lt;
    camBegin(960, 545, zoom, -.008 * Math.sin(t * 2));
    well(535, 1385, 300, 930);
    frog(960, 845, 92, t, { bounce: Math.sin(t * 4) * 5 });
    const appear = ease(seg(lt, .35, 1.35));
    star(960, 175, 45, appear);
    if (lt > .6) line([[975, 260], [1000, 325], [1006, 375]], 1.7, BLUE, 'inkfine');
    camEnd();
  }
  function climb(t, lt) {
    back();
    camBegin(960, 550, 1 + .08 * seg(lt, 0, 2));
    well(535, 1385, 300, 930);
    const rise = ease(seg(lt, .05, 1.75));
    for (let i = 0; i < 7; i++) {
      const y = 350 + i * 82;
      line([[658, y], [790, y + 6]], 2.5, INK, 'ink');
    }
    line([[660, 310], [650, 908]], 2.5, INK);
    line([[790, 310], [803, 908]], 2.5, INK);
    frog(850, 828 - rise * 480, 76, t, { bounce: Math.sin(t * 12) * 4, rot: -.08 });
    line([[1050, 675], [1057, 610], [1050, 540], [1057, 475]], 2, BLUE, 'inkfine');
    paint(starPts(1050, 420, 22, .33, 4), { wash: BLUE, ink: null });
    camEnd();
  }
  function horizon(t, lt) {
    back();
    const push = ease(seg(lt, .1, 1.85));
    camBegin(960 + push * 100, 540, 1 + push * .06);
    line([[130, 820], [370, 675], [610, 790], [880, 610], [1120, 715], [1410, 570], [1800, 690]], 3, INK, 'ink');
    line([[100, 888], [540, 872], [900, 894], [1330, 860], [1820, 875]], 2, '#8ba397', 'inkfine');
    paint(ellPts(1515, 290, 125, 125, 34, 1), { wash: LIME, ink: INK, sw: 1.6 });
    for (let i = 0; i < 5; i++) line([[1450 + i * 38, 105], [1465 + i * 38, 65]], 1.2, INK, 'HB');
    frog(660 + push * 570, 700 - Math.sin(push * Math.PI) * 265, 96, t, { rot: push * .25, bounce: Math.sin(t * 7) * 3 });
    for (let i = 0; i < 7; i++) {
      const x = 650 + i * 125;
      paint(ellPts(x, 870 - Math.sin(i * .6) * 80, 5, 5, 10), { wash: BLUE, ink: null });
    }
    star(1270, 235, 30, .7 + .2 * Math.sin(t * 7));
    camEnd();
  }
  chapter('ascent', 0, 6, [[0, bottom], [2, climb], [4, horizon]]);
})();
