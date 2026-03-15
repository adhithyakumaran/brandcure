'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMM = () => setMenuOpen(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);

    /* ── CURSOR ── */
    const dot = document.getElementById('cdot')!;
    const ring = document.getElementById('cring')!;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      gsap.to(dot, { x: mx, y: my, duration: .08 });
    };
    document.addEventListener('mousemove', onMove);
    const animCursor = () => {
      rx += (mx - rx) * .11; ry += (my - ry) * .11;
      gsap.set(ring, { x: rx, y: ry });
      requestAnimationFrame(animCursor);
    };
    animCursor();
    document.querySelectorAll('a, button, .sv-card, .wk-item, .pr-single').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('big'));
      el.addEventListener('mouseleave', () => ring.classList.remove('big'));
    });

    /* ── THREE.JS ── */
    const canvas = canvasRef.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, .1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 30;

    const N = 1800;
    const pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      pos[i3]   = (Math.random() - .5) * 90;
      pos[i3+1] = (Math.random() - .5) * 65;
      pos[i3+2] = (Math.random() - .5) * 45;
      if (Math.random() < .08) {
        col[i3] = 0.48; col[i3+1] = 0.55; col[i3+2] = 0.31;
      } else {
        const v = 0.55 + Math.random() * .2;
        col[i3] = col[i3+1] = col[i3+2] = v;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({ size: .11, vertexColors: true, transparent: true, opacity: .55, sizeAttenuation: true });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(9, 2),
      new THREE.MeshBasicMaterial({ color: 0x7A8B50, wireframe: true, transparent: true, opacity: .06 })
    );
    ico.position.set(14, -4, -4);
    scene.add(ico);

    const tor = new THREE.Mesh(
      new THREE.TorusGeometry(5, .65, 8, 40),
      new THREE.MeshBasicMaterial({ color: 0xBBB7B0, wireframe: true, transparent: true, opacity: .07 })
    );
    tor.position.set(-15, 6, -10);
    scene.add(tor);

    let tRx = 0, tRy = 0, clock = 0;
    const onMouseMove3D = (e: MouseEvent) => {
      tRy = (e.clientX / window.innerWidth - .5) * .45;
      tRx = (e.clientY / window.innerHeight - .5) * .22;
    };
    document.addEventListener('mousemove', onMouseMove3D);

    let animId: number;
    const loop3D = () => {
      animId = requestAnimationFrame(loop3D);
      clock += .004;
      pts.rotation.y += (tRy * .3 - pts.rotation.y) * .05;
      pts.rotation.x += (tRx * .3 - pts.rotation.x) * .05;
      pts.rotation.z += .0006;
      ico.rotation.y += .0022; ico.rotation.x += .0013;
      tor.rotation.x += .003;  tor.rotation.z += .0016;
      ico.scale.setScalar(1 + Math.sin(clock) * .022);
      renderer.render(scene, camera);
    };
    loop3D();

    const onResize = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ── LOADER + HERO ENTRANCE ── */
    gsap.set('.h-eye', { opacity: 0, y: 16 });
    gsap.set('#ld-sub', { opacity: 0, y: 8 });

    const tl = gsap.timeline({
      onComplete: () => {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
      }
    });
    tl
      .to('#ld-t',     { y: '0%', duration: .85, ease: 'power3.out', delay: .2 })
      .to('#ld-sub',   { opacity: 1, y: 0, duration: .5, ease: 'power2.out' }, '-=.3')
      .to('#loader',   { yPercent: -100, duration: 1, ease: 'power4.inOut', delay: .5 })
      .to('.h-li',     { y: '0%', duration: 1.1, stagger: .12, ease: 'power4.out' }, '-=.4')
      .to('.h-eye',    { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.75')
      .to('.h-desc',   { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.6')
      .to('.h-ctas',   { opacity: 1, y: 0, duration: .65, ease: 'power3.out' }, '-=.5')
      .to('.h-scroll', { opacity: 1, duration: .6, ease: 'power3.out' }, '-=.5');

    /* ── SCROLL ANIMATIONS ── */
    gsap.utils.toArray<HTMLElement>('.sv-card').forEach((el, i) => {
      gsap.fromTo(el,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: .9, ease: 'power3.out', delay: (i % 4) * .08,
          scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' }
        }
      );
    });

    const wkItems = document.querySelectorAll<HTMLElement>('.wk-item');
    const wkAnims = [
      { from: { x: -60, opacity: 0, scale: .95 }, ease: 'power3.out' },
      { from: { x: 60,  opacity: 0, scale: .95 }, ease: 'power3.out' },
      { from: { y: 70,  opacity: 0, rotateZ: -2 }, ease: 'back.out(1.4)' },
      { from: { y: 70,  opacity: 0, rotateZ: 2  }, ease: 'back.out(1.4)' },
      { from: { scaleY: .6, opacity: 0, transformOrigin: 'bottom center' }, ease: 'power4.out' },
      { from: { scale: .8, opacity: 0, rotateZ: 3 }, ease: 'back.out(1.6)' },
    ];
    wkItems.forEach((el, i) => {
      const anim = wkAnims[i] || { from: { y: 50, opacity: 0 }, ease: 'power3.out' };
      gsap.fromTo(el,
        { ...anim.from },
        { x: 0, y: 0, opacity: 1, scale: 1, scaleY: 1, rotateZ: 0,
          duration: 1, ease: anim.ease,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        }
      );
      const cnt = el.querySelector<HTMLElement>('.wk-cnt');
      if (cnt) gsap.fromTo(cnt,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: .7, ease: 'power3.out', delay: .22,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        }
      );
    });

    gsap.fromTo('.pr-single',
      { y: 50, opacity: 0, scale: .97 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.pr-single', start: 'top 87%', toggleActions: 'play none none none' }
      }
    );

    gsap.utils.toArray<HTMLElement>('.sv-title, .wk-title, .pr-title, .ct-title').forEach(el => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 84%' }
        }
      );
    });

    gsap.utils.toArray<HTMLElement>('.sv-sub, .ct-mail, .wk-ct').forEach(el => {
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' }
        }
      );
    });

    gsap.fromTo('.ct-acts',
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: .85, ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-acts', start: 'top 90%' }
      }
    );

    gsap.utils.toArray<HTMLElement>('.s-label').forEach(el => {
      gsap.fromTo(el,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: .75, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      );
    });

    /* ── STATS COUNTER ── */
    document.querySelectorAll<HTMLElement>('.st-num[data-t]').forEach(el => {
      const target = parseInt(el.dataset.t!);
      const sfx = el.dataset.sfx || '';
      ScrollTrigger.create({
        trigger: el, start: 'top 82%', once: true,
        onEnter: () => {
          gsap.fromTo(el.parentElement!,
            { scale: .88, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: .75, ease: 'back.out(1.7)' }
          );
          const proxy = { v: 0 };
          gsap.to(proxy, {
            v: target, duration: 1.8, ease: 'power2.out',
            onUpdate() {
              const n = Math.round(proxy.v);
              el.innerHTML = n + `<span class="sfx">${sfx}</span>`;
            },
            onComplete() {
              el.innerHTML = target + `<span class="sfx">${sfx}</span>`;
            }
          });
        }
      });
    });

    gsap.to('#hcanvas', {
      yPercent: 20, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.to('.ct-ghost', {
      xPercent: -7, ease: 'none',
      scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: true }
    });
    gsap.fromTo('.ft-brand',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: 'footer', start: 'top 88%' }
      }
    );
    gsap.fromTo('.pr-below',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: '.pr-below', start: 'top 90%' }
      }
    );

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousemove', onMouseMove3D);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <div className="grain" />
      <div id="cdot" />
      <div id="cring" />

      {/* LOADER */}
      <div id="loader">
        <div className="ld-word"><span id="ld-t">Brandcure.</span></div>
        <div className="ld-sub" id="ld-sub">Visual Engineering &amp; Digital Excellence</div>
        <div className="ld-bar" />
      </div>

      {/* NAV */}
      <nav>
        <button
          className={`nav-ham${menuOpen ? ' open' : ''}`}
          aria-label="Menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
        <a href="#" className="logo">Brand<em>cure</em></a>
        <ul className="nav-links">
          <li><a href="#works">Works</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Hire the Studio</a>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <a href="#works"    onClick={closeMM}>Works</a>
        <a href="#services" onClick={closeMM}>Services</a>
        <a href="#pricing"  onClick={closeMM}>Pricing</a>
        <a href="#contact"  onClick={closeMM}>Contact</a>
        <a href="#contact"  className="mobile-cta" onClick={closeMM}>Hire the Studio</a>
      </div>

      {/* HERO */}
      <section id="hero">
        <canvas id="hcanvas" ref={canvasRef} />
        <div className="h-blob" />
        <div className="h-eye">Visual Engineering &amp; Brand Excellence</div>
        <h1 className="h-title">
          <span className="h-line"><span className="h-li">We Build</span></span>
          <span className="h-line"><span className="h-li h-out">Digital</span></span>
          <span className="h-line"><span className="h-li h-acc">Legends.</span></span>
        </h1>
        <div className="h-bot">
          <p className="h-desc">We partner with ambitious startups &amp; enterprises to build premium digital experiences. No resumes. Just proof.</p>
          <div className="h-ctas">
            <a href="#contact" className="h-btn-primary">Let&apos;s Talk</a>
            <a href="#services" className="h-btn-ghost">About Us</a>
          </div>
        </div>
        <div className="h-scroll">
          <span>Scroll</span>
          <div className="s-line" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="mq-wrap">
        <div className="mq-track">
          {['AI Ads','Web Design','AI UGC','Branding','Video Studio™','Digital Products','Visual Engineering','AI Cinematography',
            'AI Ads','Web Design','AI UGC','Branding','Video Studio™','Digital Products','Visual Engineering','AI Cinematography'].map((t, i) => (
            <div key={i} className="mq-item"><span className="mq-dot" />{t}</div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services">
        <div className="s-label">What We Do</div>
        <div className="sv-head">
          <h2 className="sv-title">Crafted<br /><em>for Impact.</em></h2>
          <p className="sv-sub">From AI-powered ad creatives to complete brand identity systems — we engineer every pixel with obsessive precision.</p>
        </div>
        <div className="sv-grid">
          {[
            { n:'01', ico:'⚡', name:'AI Ads', desc:'Performance-driven ad creatives powered by artificial intelligence. Built to convert, built to scale.' },
            { n:'02', ico:'🎬', name:'AI UGC', desc:'Authentic user-generated content at unlimited scale, crafted by AI. Real feel, real results.' },
            { n:'03', ico:'✦', name:'Web Design', desc:'Stunning, conversion-focused websites that tell your brand story and drive measurable results.' },
            { n:'04', ico:'◈', name:'Branding', desc:'Complete brand identity systems built for the modern era. Memorable, scalable, distinctly yours.' },
          ].map(s => (
            <div key={s.n} className="sv-card">
              <div className="sv-num">{s.n}</div>
              <span className="sv-ico">{s.ico}</span>
              <h3 className="sv-name">{s.name}</h3>
              <p className="sv-desc">{s.desc}</p>
              <span className="sv-arr">↗</span>
            </div>
          ))}
        </div>
      </section>

      {/* WORKS */}
      <section id="works">
        <div className="wk-head">
          <div>
            <div className="s-label">Selected Works</div>
            <h2 className="wk-title">The <em>Proof.</em></h2>
          </div>
          <span className="wk-ct">06 Projects</span>
        </div>
        <div className="wk-grid">
          {/* LEFT */}
          <div className="wk-col-l">
            <div className="wk-item wk-feat">
              <div className="wk-bg g1" /><div className="wk-ov" />
              <a href="https://srptravelsomr.com" target="_blank" rel="noopener" className="wk-link">↗</a>
              <div className="wk-cnt">
                <div className="wk-tags"><span className="wk-tag">Next.js</span><span className="wk-tag">Branding</span></div>
                <h3 className="wk-name">SRP Travels</h3>
                <p className="wk-sub">Premium Travel Agency Website</p>
              </div>
            </div>
            <div className="wk-row-sm">
              <div className="wk-item wk-sm">
                <div className="wk-bg g3" /><div className="wk-ov" />
                <a href="https://www.chatpilot.co.in" target="_blank" rel="noopener" className="wk-link">↗</a>
                <div className="wk-cnt">
                  <div className="wk-tags"><span className="wk-tag">AI Product</span></div>
                  <h3 className="wk-name">ChatPilot</h3>
                  <p className="wk-sub">AI Chat Platform</p>
                </div>
              </div>
              <div className="wk-item wk-sm">
                <div className="wk-bg g5" /><div className="wk-ov" />
                <a href="https://grewbie-interview.vercel.app" target="_blank" rel="noopener" className="wk-link">↗</a>
                <div className="wk-cnt">
                  <div className="wk-tags"><span className="wk-tag">AI Product</span></div>
                  <h3 className="wk-name">Grewbie</h3>
                  <p className="wk-sub">AI Interview Prep</p>
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="wk-col-r">
            <div className="wk-item wk-mid">
              <div className="wk-bg g2" /><div className="wk-ov" />
              <a href="https://jayalakshmiwateragency.com" target="_blank" rel="noopener" className="wk-link">↗</a>
              <div className="wk-cnt">
                <div className="wk-tags"><span className="wk-tag">Next.js</span><span className="wk-tag">Web Design</span></div>
                <h3 className="wk-name">Jayalakshmi</h3>
                <p className="wk-sub">Water Agency — Live Operations</p>
              </div>
            </div>
            <div className="wk-item wk-mid">
              <div className="wk-bg g4" /><div className="wk-ov" />
              <a href="https://walkindrive.vercel.app" target="_blank" rel="noopener" className="wk-link">↗</a>
              <div className="wk-cnt">
                <div className="wk-tags"><span className="wk-tag">Next.js</span><span className="wk-tag">Platform</span></div>
                <h3 className="wk-name">Walk-in Drive</h3>
                <p className="wk-sub">Job Portal — Students to Opportunities</p>
              </div>
            </div>
            <div className="wk-item wk-sm">
              <div className="wk-bg" style={{ background: 'linear-gradient(135deg,#e96c3e 0%,#f5a623 100%)' }} /><div className="wk-ov" />
              <a href="https://remix-of-cofolio-the-future-of-foun-iota.vercel.app/" target="_blank" rel="noopener" className="wk-link">↗</a>
              <div className="wk-cnt">
                <div className="wk-tags"><span className="wk-tag">React</span><span className="wk-tag">Framer</span></div>
                <h3 className="wk-name">Cofolio</h3>
                <p className="wk-sub">Founder Portfolio Platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div id="stats">
        <div className="st-item">
          <span className="st-num" data-t="20" data-sfx="+">0</span>
          <span className="st-lbl">Projects Shipped</span>
        </div>
        <div className="st-div" />
        <div className="st-item">
          <span className="st-num" data-t="98" data-sfx="%">0</span>
          <span className="st-lbl">Client Satisfaction</span>
        </div>
        <div className="st-div" />
        <div className="st-item">
          <span className="st-num" data-t="2" data-sfx="+ Yrs">0</span>
          <span className="st-lbl">Years of Mastery</span>
        </div>
      </div>

      {/* PRICING */}
      <section id="pricing">
        <div className="pr-head">
          <div className="s-label" style={{ justifyContent: 'center' }}>What We Offer</div>
          <h2 className="pr-title">Built to Last.<br /><em>Priced to fit.</em></h2>
          <p className="pr-sub">Every project is custom-quoted. No hidden fees, no packages — just the right solution for you.</p>
        </div>
        <div className="pr-single">
          <div className="pr-lbl">Starter Package</div>
          <div className="pr-headline">Your first step towards<br />a premium digital presence.</div>
          <p className="pr-tagline">Whether you need a stunning landing page, a full brand identity, or an AI-powered ad campaign — we scope it together and build it right.</p>
          <ul className="pr-feats">
            <li>Landing Page / Multi-page Website</li>
            <li>Custom Design &amp; Brand Identity</li>
            <li>AI Ad Creatives &amp; UGC</li>
            <li>Fully Responsive &amp; SEO Optimized</li>
            <li>Fast Delivery &amp; Ongoing Support</li>
          </ul>
          <a href="#contact" className="pr-btn pr-fill">Contact Us</a>
        </div>
        <div className="pr-below">
          <p className="pr-tagline-big">Let&apos;s build something<br /><em>together.</em></p>
          <p className="pr-tagline-sub">Reach out and we&apos;ll get back to you within 24 hours.</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="ct-ghost">Brandcure.</div>
        <div className="ct-body">
          <div className="s-label">Get In Touch</div>
          <h2 className="ct-title">
            Let&apos;s Build<br />
            <span className="l2">Something <span className="hl">Great.</span></span>
          </h2>
          <a href="mailto:hello@brandcure.in" className="ct-mail">hello@brandcure.in ↗</a>
          <div className="ct-acts">
            <a href="mailto:hello@brandcure.in" className="btn-p">Start a Project</a>
            <a href="#works" className="btn-g">View Our Work →</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="ft-top">
          <div>
            <div className="ft-brand">Brand<em>cure</em></div>
            <p className="ft-tag">We partner with ambitious brands to build premium digital experiences. No resumes. Just proof.</p>
            <div className="ft-socs">
              <a href="#" className="ft-soc" title="Twitter / X">𝕏</a>
              <a href="#" className="ft-soc" title="LinkedIn">in</a>
              <a href="#" className="ft-soc" title="Instagram">ig</a>
            </div>
          </div>
          <div className="ft-col">
            <h4>Studio</h4>
            <ul>
              <li><a href="#works">Works</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#">Video Studio™</a></li>
              <li><a href="#">Artifacts</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </div>
          <div className="ft-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">AI Ads</a></li>
              <li><a href="#services">AI UGC</a></li>
              <li><a href="#services">Web Design</a></li>
              <li><a href="#services">Branding</a></li>
              <li><a href="#">APPEL</a></li>
            </ul>
          </div>
          <div className="ft-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@brandcure.in">hello@brandcure.in</a></li>
              <li><a href="#contact">Hire the Studio</a></li>
              <li><a href="#contact">Join the Team</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="ft-bot">
          <span className="ft-copy">© 2025 Brandcure. All rights reserved.</span>
          <span className="ft-loc">Chennai, IN — Lakewood, NJ</span>
        </div>
      </footer>
    </>
  );
}
