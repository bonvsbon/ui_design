/* Product-led concepts 08–10 reuse the researched catalog and shopping controls. */
(() => {
  if (!['detaillab', 'sidebyside', 'lineup'].includes(activeDesign)) return;
  const oldHero = document.querySelector('.hero');
  if (!oldHero) return;
  const product = id => products.find(item => item.id === id);
  const shot = (item, eager = false) => `<img class="explore-image${item.id === 'bold' ? ' explore-image-bold' : ''}" src="${item.image}" alt="${item.alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>`;
  const action = (id, text = 'ดูรายละเอียด') => `<button type="button" class="explore-button" data-explore-product="${id}">${text}<span aria-hidden="true">↗</span></button>`;
  const choices = ['iconic', 'bold', 'cozy', 'tofu'];
  const shortName = item => item.id === 'cozy' ? 'COZY' : item.name;
  const formNotes = {
    strap: ['สายคาดคู่ ปรับให้พอดี', 'แถบตีนตุ๊กแกช่วยปรับสายให้กระชับกับหน้าเท้า สวมง่ายในทุกวัน'],
    material: ['Phylon ที่เบาสบาย', 'รุ่น BOLD ใช้วัสดุ Phylon พร้อม G-BOLD Technology™ เพื่อความเบาและความสบาย'],
    shape: ['ทรงสวม เปิดรับวันใหม่', 'รองเท้าแตะสวมทรงเปิด เลือกความพอดีได้ตั้งแต่ไซซ์ 36 ถึง 44']
  };
  const compareCard = (side, id) => {
    const p = product(id);
    return `<article class="compare-option compare-option-${side}">
      <label class="compare-select" for="compare-${side}"><span>${side === 'left' ? 'คู่แรกของคุณ' : 'อีกคู่ที่สนใจ'}</span><select id="compare-${side}" data-compare="${side}">${choices.map(value => `<option value="${value}"${value === id ? ' selected' : ''}>${shortName(product(value))}</option>`).join('')}</select></label>
      <div class="compare-photo" id="compare-photo-${side}">${shot(p, true)}</div>
      <div class="compare-bottom"><div><h2 id="compare-name-${side}">${shortName(p)}</h2><p id="compare-price-${side}">${formatPrice(p.price)}</p></div><div id="compare-action-${side}">${action(id, 'เลือกคู่นี้')}</div></div>
    </article>`;
  };
  const lineupIds = ['iconic', 'bold', 'cozy'];
  const lineupCopy = ['คู่คุ้นเคยของทุกวัน', 'สวมง่าย แล้วออกไปเลย', 'ให้วันพัก สบายขึ้นอีกนิด'];
  const templates = {
    detaillab: `<section class="exploration detail-lab" aria-labelledby="explore-title">
      <header class="lab-heading"><div><p class="explore-label">BOLD / GAMBOL</p><h1 id="explore-title">ใกล้ขึ้นอีกนิด.<br><span>สบายขึ้นอีกหน่อย.</span></h1></div><p>รองเท้าคู่หนึ่ง มีรายละเอียดมากกว่าที่เห็น<br>ลองกดจุดบนภาพ แล้วรู้จัก BOLD ให้มากขึ้น</p></header>
      <div class="lab-workbench"><div class="lab-canvas"><span class="lab-watermark" aria-hidden="true">BOLD</span>${shot(product('bold'), true)}
        <div class="lab-hotspots" role="group" aria-label="สำรวจรายละเอียดรองเท้า"><button class="lab-spot lab-spot-strap" data-feature="strap" aria-pressed="true" aria-controls="lab-insight" aria-label="สำรวจสายคาดคู่">+</button><button class="lab-spot lab-spot-material" data-feature="material" aria-pressed="false" aria-controls="lab-insight" aria-label="สำรวจวัสดุ Phylon">+</button><button class="lab-spot lab-spot-shape" data-feature="shape" aria-pressed="false" aria-controls="lab-insight" aria-label="สำรวจทรงสวมและไซซ์">+</button></div>
        <span class="lab-image-note">แตะเครื่องหมาย + เพื่อสำรวจ</span></div>
      <aside class="lab-insight" id="lab-insight" aria-live="polite"><span class="lab-insight-symbol" aria-hidden="true">+</span><div><p class="explore-label">รายละเอียดที่ใส่ใจ</p><h2 id="lab-feature-title">${formNotes.strap[0]}</h2><p id="lab-feature-copy">${formNotes.strap[1]}</p></div><div class="lab-buy"><p><strong>BOLD</strong><span>${formatPrice(product('bold').price)}</span></p>${action('bold', 'เลือกไซซ์ของคุณ')}</div></aside></div>
    </section>`,
    sidebyside: `<section class="exploration side-by-side" aria-labelledby="explore-title"><header class="compare-heading"><div><p class="explore-label">GAMBOL / SIDE BY SIDE</p><h1 id="explore-title">ชอบทั้งสอง.<br><span>เลือกคู่ที่เป็นคุณ.</span></h1></div><p>วางคู่ที่สนใจไว้ข้างกัน<br>เทียบทรง ไซซ์ และราคา แล้วค่อยตัดสินใจ</p></header>
      <div class="compare-stage">${compareCard('left', 'iconic')}${compareCard('right', 'bold')}<span class="compare-versus" aria-hidden="true">&</span></div>
      <div class="compare-facts" id="compare-facts" aria-live="polite"></div>
    </section>`,
    lineup: `<section class="exploration the-lineup" aria-labelledby="explore-title"><header class="lineup-heading"><div><p class="explore-label">THE GAMBOL LINEUP</p><h1 id="explore-title">ทุกวันมีจังหวะ.<br>ทุกคู่มีสไตล์.</h1></div><div><p>คอลเลกชันเล็ก ๆ สำหรับวันที่ไม่เหมือนกัน<br>เปิดดูทีละคู่ แล้วเจอสไตล์ของคุณ</p><a href="#products">ดูรองเท้าทุกรุ่น <span aria-hidden="true">↘</span></a></div><span class="lineup-mark" aria-hidden="true">G</span></header>
      <div class="lineup-shelf">${lineupIds.map((id, i) => { const p = product(id); return `<article class="lineup-row${i === 0 ? ' is-open' : ''}"><h2><button class="lineup-trigger" id="lineup-trigger-${id}" aria-expanded="${i === 0}" aria-controls="lineup-panel-${id}" data-lineup="${id}"><span class="lineup-thumb">${shot(p)}</span><span class="lineup-title">${shortName(p)}<small>${lineupCopy[i]}</small></span><span class="lineup-row-price">${formatPrice(p.price)}</span><span class="lineup-toggle" aria-hidden="true">${i === 0 ? '−' : '+'}</span></button></h2><div class="lineup-panel" id="lineup-panel-${id}" role="region" aria-labelledby="lineup-trigger-${id}"${i === 0 ? '' : ' hidden'}><div class="lineup-product-shot">${shot(p, i === 0)}</div><div class="lineup-product-copy"><p>${p.description}</p><dl><div><dt>ไซซ์</dt><dd>${p.minSize}–${p.maxSize}</dd></div><div><dt>ประเภท</dt><dd>${p.categoryLabel}</dd></div></dl>${action(id, 'รู้จักคู่นี้')}</div></div></article>`; }).join('')}</div>
    </section>`
  };
  oldHero.outerHTML = templates[activeDesign];
  const root = document.querySelector('.exploration');
  root.addEventListener('click', event => {
    const detail = event.target.closest('[data-explore-product]');
    if (detail) { openProduct(detail.dataset.exploreProduct); return; }
    const feature = event.target.closest('[data-feature]');
    if (feature) {
      root.querySelectorAll('[data-feature]').forEach(button => button.setAttribute('aria-pressed', String(button === feature)));
      const [title, copy] = formNotes[feature.dataset.feature];
      root.querySelector('#lab-feature-title').textContent = title;
      root.querySelector('#lab-feature-copy').textContent = copy;
    }
    const trigger = event.target.closest('[data-lineup]');
    if (trigger) {
      const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
      root.querySelectorAll('[data-lineup]').forEach(button => {
        const expanded = willOpen && button === trigger;
        button.setAttribute('aria-expanded', String(expanded));
        button.querySelector('.lineup-toggle').textContent = expanded ? '−' : '+';
        button.closest('.lineup-row').classList.toggle('is-open', expanded);
        document.getElementById(button.getAttribute('aria-controls')).hidden = !expanded;
      });
    }
  });
  if (activeDesign === 'sidebyside') {
    const selections = { left: 'iconic', right: 'bold' };
    const renderFacts = () => {
      const left = product(selections.left), right = product(selections.right);
      const rows = [
        ['รูปแบบ', left.categoryLabel, right.categoryLabel],
        ['ไซซ์ที่มีในรุ่น', `${left.minSize}–${left.maxSize}`, `${right.minSize}–${right.maxSize}`],
        ['จุดเด่น', left.tag, right.tag],
        ['ราคาอ้างอิง', formatPrice(left.price), formatPrice(right.price)]
      ];
      root.querySelector('#compare-facts').innerHTML = `<table><caption>รายละเอียดที่ช่วยให้เลือกง่ายขึ้น</caption><thead><tr><th scope="col">เปรียบเทียบ</th><th scope="col">${shortName(left)}</th><th scope="col">${shortName(right)}</th></tr></thead><tbody>${rows.map(row => `<tr><th scope="row">${row[0]}</th><td>${row[1]}</td><td>${row[2]}</td></tr>`).join('')}</tbody></table><p>ราคาและไซซ์อ้างอิงจากข้อมูลสินค้า โปรดดูข้อมูลล่าสุดที่ร้านทางการ</p>`;
    };
    root.addEventListener('change', event => {
      const select = event.target.closest('[data-compare]');
      if (!select) return;
      const side = select.dataset.compare, p = product(select.value);
      selections[side] = p.id;
      root.querySelector(`#compare-photo-${side}`).innerHTML = shot(p, true);
      root.querySelector(`#compare-name-${side}`).textContent = shortName(p);
      root.querySelector(`#compare-price-${side}`).textContent = formatPrice(p.price);
      root.querySelector(`#compare-action-${side}`).innerHTML = action(p.id, 'เลือกคู่นี้');
      renderFacts();
    });
    renderFacts();
  }
})();
