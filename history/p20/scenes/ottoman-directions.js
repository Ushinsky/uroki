// § 20: two rulers open the main directions of Ottoman campaigns.
// This is a direction diagram, not a geographic map.
(function () {
  const SC = (window.SCENES = window.SCENES || {});
  const R = window.RIG;
  const { C, E, P, mix, fig, inkFill, rr, ln, text, seg, breathe, pulse, lp, arrow, circle } = R;

  const WEST = '#1d4f91';
  const EAST = '#a64230';
  const STROKE = '#9aa8ae';
  const TRACK_Y = -145;
  const SELIM = 55;
  const SULEIMAN = -55;

  function post(g, x, label, color, k) {
    if (k <= 0) return;
    g.save();
    g.globalAlpha *= E.soft(k);
    circle(g, x, TRACK_Y, 3.5);
    inkFill(g, '#fff', 1.5, color);
    text(g, label, x, TRACK_Y - 10, 10.5, C.ink);
    g.restore();
  }

  function lever(g, x, color, pull) {
    rr(g, x - 16, -40, 32, 13, 4);
    inkFill(g, '#f4f6f5', 1.4, STROKE);
    ln(g, x, -40, x + pull * 8, -62 + pull * 6, 3, color);
    circle(g, x + pull * 8, -62 + pull * 6, 5);
    inkFill(g, color, 1.2, C.ink);
  }

  function ruler(g, S, x, sx, name, color, pose) {
    fig(g, pose, x, 0, { sx, ink: color, far: color, wave: S.wave, wt: S.wt });
    text(g, name, x, 17, 11, color);
  }

  SC['ottoman-directions'] = {
    dur: 7.2,
    width: 480,
    label: 'Селим I направляет главные походы на восток: Иран, Египет, Мекка и Медина. Сулейман I идёт на запад: завоёвана почти вся Венгрия, но Вену взять не удалось.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const fade = T < 0 ? 0 : 1 - E.soft(seg(T, 6.65, 7.2));
      const eastK = T < 0 ? 0 : E.soft(seg(T, 0.85, 2.5)) * fade;
      const westK = T < 0 ? 0 : E.soft(seg(T, 3.55, 5.1)) * fade;
      const eastPull = T < 0 ? 0 : E.soft(seg(T, 0.25, 0.8)) * (1 - E.soft(seg(T, 2.4, 2.85))) * fade;
      const westPull = T < 0 ? 0 : E.soft(seg(T, 3, 3.5)) * (1 - E.soft(seg(T, 5.9, 6.35))) * fade;

      // A fixed axis makes the comparison visible even before playback.
      ln(g, -220, TRACK_Y, 220, TRACK_Y, 1.5, '#d1d9dc');
      if (eastK > 0.06) arrow(g, [[0, TRACK_Y], [218, TRACK_Y]], { k: seg(eastK, 0.06, 1), lw: 3, col: EAST, head: 7 });
      if (westK > 0.06) arrow(g, [[0, TRACK_Y], [-218, TRACK_Y]], { k: seg(westK, 0.06, 1), lw: 3, col: WEST, head: 7 });
      rr(g, -37, -185, 74, 25, 5);
      inkFill(g, '#fff', 1.5, C.ink);
      text(g, 'Стамбул', 0, -168, 10.5, C.ink);

      text(g, '← ЗАПАД', -165, -176, 10, WEST);
      text(g, 'ВОСТОК →', 165, -176, 10, EAST);

      post(g, 74, 'Иран', EAST, seg(eastK, 0.25, 0.4));
      post(g, 142, 'Египет', EAST, seg(eastK, 0.55, 0.7));
      if (eastK > 0.8) {
        g.save();
        g.globalAlpha *= E.soft(seg(eastK, 0.8, 0.97));
        circle(g, 211, TRACK_Y, 3.5);
        inkFill(g, '#fff', 1.5, EAST);
        text(g, 'Мекка', 211, TRACK_Y - 22, 10, C.ink);
        text(g, 'Медина', 211, TRACK_Y - 10, 10, C.ink);
        g.restore();
      }
      post(g, -95, 'Венгрия', WEST, seg(westK, 0.3, 0.45));
      post(g, -205, 'Вена', WEST, seg(westK, 0.85, 0.97));
      if (westK > 0.87) {
        g.save();
        g.globalAlpha *= E.soft(seg(westK, 0.87, 1));
        text(g, '×', -205, -118, 23, '#b53927');
        g.restore();
      }

      lever(g, -27, WEST, westPull);
      lever(g, 27, EAST, eastPull);

      let westPose = breathe(P({ hF: [12, -60], hB: [-4, -52] }), t);
      let eastPose = breathe(P({ hF: [12, -60], hB: [-4, -52] }), t);
      const idleGesture = T < 0 ? 1 : 1 - E.soft(seg(T, 6.3, 7.2));
      westPose = mix(westPose, P({ hF: [10, -96], hB: [-4, -54] }), pulse(t, 6.3, 2, 1.5) * idleGesture);
      eastPose = mix(eastPose, P({ hF: [10, -96], hB: [-4, -54] }), pulse(t, 6.3, 4.7, 1.5) * idleGesture);
      if (T >= 0) {
        westPose = mix(westPose, P({ hF: lp([-27, -56], SULEIMAN, 0, 1), hB: [-4, -52], head: [9, -115] }), westPull);
        eastPose = mix(eastPose, P({ hF: lp([27, -56], SELIM, 0, -1), hB: [-4, -52], head: [9, -115] }), eastPull);
      }
      ruler(g, S, SULEIMAN, 1, 'Сулейман I', WEST, westPose);
      ruler(g, S, SELIM, -1, 'Селим I', EAST, eastPose);
    },
  };
})();
