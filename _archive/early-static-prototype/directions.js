/* Additional compositions share the source-backed catalog and native dialogs. */
(() => {
  const hero = document.querySelector('.hero');
  if (!hero || !['studio', 'playground', 'dayfinder'].includes(activeDesign)) return;
  const get = (id) => products.find((p) => p.id === id);
  const picture = (p, cls = '') => `<img class="${cls}" src="${p.image}" alt="${p.alt}" fetchpriority="high">`;
  const details = (id, label = 'ดูรายละเอียด') => `<button class="direction-action" type="button" data-detail="${id}">${label} <span aria-hidden="true">↗</span></button>`;
  const templates = {
    studio: `<section class="direction-hero studio-hero" aria-labelledby="direction-title">
      <div class="studio-heading"><span class="direction-overline">GAMBOL / EVERYDAY OBJECTS</span><h1 id="direction-title">ความสบาย<br><em>อยู่ในรายละเอียด</em></h1><p>สัมผัสนุ่ม สีที่ใช่ และทรงที่ใส่ได้ทุกวัน<br>ทำความรู้จักคู่โปรดของคุณให้ใกล้ขึ้น</p></div>
      <div class="studio-stage"><span class="studio-backword" aria-hidden="true">ICONIC</span><div id="studio-picture">${picture(get('iconic'))}</div><span class="studio-note">G-BOLD<br>นุ่ม · เบา · ใส่สบาย</span></div>
      <div class="studio-bottom"><div class="studio-product" aria-live="polite"><span>คู่ที่กำลังดู</span><h2 id="studio-name">ICONIC</h2><p id="studio-price">${formatPrice(get('iconic').price)}</p></div>
      <div class="studio-tabs" role="group" aria-label="เลือกรุ่นบนเวทีสินค้า">${['iconic','bold','cozy'].map((id,i)=>`<button type="button" data-studio="${id}" aria-pressed="${i===0}"><img src="${get(id).image}" alt=""><span>${get(id).name}</span></button>`).join('')}</div><div id="studio-action">${details('iconic','สำรวจคู่นี้')}</div></div>
    </section>`,
    playground: `<section class="direction-hero playground-hero" aria-labelledby="direction-title">
      <div class="play-heading"><span class="play-star" aria-hidden="true">✳</span><h1 id="direction-title">คู่ไหนก็ได้<br><em>ที่เป็นคุณ.</em></h1><div><p>แต่งตัวตามใจ แล้วออกไปสนุก<br>ด้วยความสบายในแบบ Gambol</p><a class="direction-action" href="#products">หาคู่ของคุณ <span aria-hidden="true">↘</span></a></div></div>
      <div class="play-wall"><button class="play-tile play-tile-one" type="button" data-detail="iconic"><span class="play-tile-label">สีโปรดของทุกวัน ↗</span>${picture(get('iconic'))}<strong>ICONIC</strong></button>
      <button class="play-tile play-tile-two" type="button" data-detail="bold"><span class="play-tile-label">สวมง่าย ไปได้เลย ↗</span>${picture(get('bold'))}<strong>BOLD</strong></button>
      <button class="play-tile play-tile-three" type="button" data-detail="cozy"><span class="play-tile-label">ชิลได้อีกหน่อย ↗</span>${picture(get('cozy'))}<strong>COZY</strong></button></div>
      <div class="play-ribbon"><span>สบายในแบบคุณ</span><span aria-hidden="true">✳</span><span>GAMBOL EVERY DAY</span><span aria-hidden="true">✳</span><span>ออกไปสนุกกัน</span></div>
    </section>`,
    dayfinder: `<section class="direction-hero finder-hero" aria-labelledby="direction-title">
      <div class="finder-intro"><span class="direction-overline">YOUR DAY, YOUR GAMBOL</span><h1 id="direction-title">วันนี้<br>จะไป<em>ไหน?</em></h1><p>เริ่มจากแผนของคุณ<br>แล้วเลือกคู่ที่ไปด้วยกันได้</p>
      <div class="finder-choices" role="group" aria-label="เลือกสไตล์การใช้งาน"><button type="button" data-plan="easy" aria-pressed="true"><span>01</span> วันชิล ๆ <b aria-hidden="true">↗</b></button><button type="button" data-plan="go" aria-pressed="false"><span>02</span> ออกไปข้างนอก <b aria-hidden="true">↗</b></button><button type="button" data-plan="soft" aria-pressed="false"><span>03</span> ลุคสบาย เรียบง่าย <b aria-hidden="true">↗</b></button></div></div>
      <div class="finder-result" aria-live="polite"><div class="finder-result-top"><span>YOUR DAILY PICK</span><span id="finder-count">01 / 03</span></div><div class="finder-image" id="finder-picture">${picture(get('iconic'))}</div><div class="finder-result-bottom"><div><span id="finder-reason">แตะหนีบใส่ง่ายสำหรับวันสบาย ๆ</span><h2 id="finder-name">ICONIC</h2><p id="finder-price">${formatPrice(get('iconic').price)}</p></div><div id="finder-action">${details('iconic','ดูคู่ที่แนะนำ')}</div></div><p class="finder-footnote">เลือกตามรูปแบบสินค้าและสไตล์การแต่งตัว</p></div>
    </section>`
  };
  hero.outerHTML = templates[activeDesign];
  document.querySelectorAll('[data-shortcut-category]').forEach((button) => {
    // Existing catalog controls remain attached outside the replaced hero.
    button.setAttribute('title', 'ดู' + button.textContent.trim());
  });
  const root = document.querySelector('.direction-hero');
  root.addEventListener('click', (event) => {
    const detail = event.target.closest('[data-detail]');
    if (detail) return openProduct(detail.dataset.detail);
    const tab = event.target.closest('[data-studio]');
    if (tab) {
      const p = get(tab.dataset.studio);
      root.querySelectorAll('[data-studio]').forEach((el) => el.setAttribute('aria-pressed', String(el === tab)));
      document.querySelector('#studio-picture').innerHTML = picture(p);
      document.querySelector('.studio-backword').textContent = p.name;
      document.querySelector('#studio-name').textContent = p.name;
      document.querySelector('#studio-price').textContent = formatPrice(p.price);
      document.querySelector('#studio-action').innerHTML = details(p.id, 'สำรวจคู่นี้');
    }
    const plan = event.target.closest('[data-plan]');
    if (plan) {
      const picks = { easy: ['iconic','แตะหนีบใส่ง่ายสำหรับวันสบาย ๆ','01'], go: ['bold','สายคาดปรับกระชับ ให้คุณเลือกความพอดี','02'], soft: ['cozy','สายผ้าหนังนิ่ม กับลุคเรียบสบาย','03'] };
      const [id,reason,num] = picks[plan.dataset.plan]; const p = get(id);
      root.querySelectorAll('[data-plan]').forEach((el) => el.setAttribute('aria-pressed', String(el === plan)));
      document.querySelector('#finder-picture').innerHTML = picture(p);
      document.querySelector('#finder-name').textContent = p.name;
      document.querySelector('#finder-reason').textContent = reason;
      document.querySelector('#finder-price').textContent = formatPrice(p.price);
      document.querySelector('#finder-count').textContent = num + ' / 03';
      document.querySelector('#finder-action').innerHTML = details(id,'ดูคู่ที่แนะนำ');
    }
  });
})();
