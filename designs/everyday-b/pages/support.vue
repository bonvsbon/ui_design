<script setup lang="ts">
useSeoMeta({ title: 'Here to help | GAMBOL' })
</script>
<template>
  <div class="support-page container">
    <div class="page-heading">
      <span class="red-label">HERE TO HELP</span>
      <h1>A LITTLE HELP.<br />A BETTER DAY.</h1>
      <p>Everything you need to find your pair.</p>
    </div>
    <div class="support-layout">
      <nav aria-label="Support topics">
        <a href="#contact">Contact us</a><a href="#shipping">Shipping & returns</a
        ><a href="#sizes">Size guide</a><a href="#faq">FAQs</a><a href="#privacy">Privacy notice</a>
      </nav>
      <div>
        <section id="contact">
          <h2>LET’S TALK.</h2>
          <p>
            The official GAMBOL team can help with current products, stockists and business
            enquiries.
          </p>
          <a href="mailto:hello@gambol.co.th">hello@gambol.co.th</a
          ><a href="tel:+6624085074">02-408-5074</a>
          <p>
            Big Star Co., Ltd. (GAMBOL Office), 116/58 Moo 1, Rama II Road, Bang Nam Chuet, Mueang
            Samut Sakhon, Samut Sakhon 74000.
          </p>
        </section>
        <section id="shipping">
          <h2>SHIPPING & RETURNS.</h2>
          <p>
            This is an independent design concept. It does not accept payments or ship orders.
            Shipping fees, delivery times and return policies will be supplied by the connected
            store before a real checkout is enabled.
          </p>
          <p>
            For purchases made through an official GAMBOL retailer, please contact the retailer
            directly for their shipping and returns policy.
          </p>
        </section>
        <section id="sizes">
          <h2>FIND YOUR FIT.</h2>
          <ol>
            <li>Stand with both feet flat on a sheet of paper.</li>
            <li>Mark your heel and longest toe, then measure the length.</li>
            <li>Use your longer foot as the reference.</li>
            <li>
              Open the size guide on your chosen product. Charts here are illustrative; try on your
              pair for a reliable fit.
            </li>
          </ol>
          <NuxtLink to="/stories/find-your-fit" class="text-link"
            >READ THE FIT GUIDE<AppIcon name="arrow" :size="18"
          /></NuxtLink>
        </section>
        <section id="faq">
          <h2>GOOD QUESTIONS.</h2>
          <details>
            <summary>What is GBOLD Technology?<AppIcon name="plus" :size="18" /></summary>
            <p>
              GBOLD is GAMBOL’s footwear technology, emphasizing comfort, softness, lightness and
              durability. <NuxtLink to="/technology">Explore the four benefits.</NuxtLink>
            </p>
          </details>
          <details>
            <summary>Can I place an order here?<AppIcon name="plus" :size="18" /></summary>
            <p>
              You can choose products, save favourites and build a bag. The final step is a local
              order preview; no payment or order is submitted.
            </p>
          </details>
          <details>
            <summary>Where are my saved pairs stored?<AppIcon name="plus" :size="18" /></summary>
            <p>
              Your bag and saved pairs stay in local browser storage on this device. They are not
              synced to an account.
            </p>
          </details>
          <details>
            <summary>Where can I try GAMBOL?<AppIcon name="plus" :size="18" /></summary>
            <p>
              Use our <NuxtLink to="/stores">store locator preview</NuxtLink> to explore the
              experience, then check the official locator for verified locations.
            </p>
          </details>
        </section>
        <section id="privacy">
          <h2>YOUR PRIVACY.</h2>
          <p>
            This local concept saves your bag, wishlist, content preview and optional email in your
            browser only. It does not send your email to a newsletter provider, create an account,
            process payments or add analytics. Clearing this site's browser storage removes these
            preferences.
          </p>
          <p>
            The optional location search uses the browser's permission prompt. Coordinates stay in
            the current page session and are used to sort sample locations by distance. Opening map
            or social links takes you to external services with their own privacy policies.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
