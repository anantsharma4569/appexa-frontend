<!--
  Pack artwork, drawn per dosage form with the brand name on the label, so each
  card looks like that product. A Product with an `image` set uses the photo
  instead. Ported from the approved design.
-->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  slug: { type: String, default: '' },
  brand: { type: String, default: '' },
  image: { type: String, default: '' },
})

const label = computed(() =>
  props.brand.length > 15 ? `${props.brand.slice(0, 14)}…` : props.brand,
)
const known = computed(() =>
  ['tablets', 'capsules', 'syrups', 'injectables', 'topicals', 'nutra'].includes(props.slug),
)
const tabletRows = [58, 88]
const tabletCols = [86, 120, 154]
</script>

<template>
  <img v-if="image" :src="image" :alt="`${brand} pack`" loading="lazy" />
  <svg v-else-if="known" viewBox="0 0 240 150" role="img" :aria-label="`${brand} pack`">
    <!-- tablets: alu-alu blister strip, tablets embossed through the foil -->
    <template v-if="slug === 'tablets'">
      <ellipse cx="120" cy="136" rx="64" ry="7" fill="#0E5C3F" opacity=".12" />
      <g transform="rotate(-7 120 74)">
        <rect x="50" y="24" width="140" height="100" rx="12" fill="url(#gFoil)" stroke="#AFB9B3" />
        <rect x="56" y="30" width="128" height="88" rx="9" fill="none" stroke="#C8D1CB" stroke-dasharray="2 3" />
        <template v-for="cy in tabletRows" :key="cy">
          <template v-for="cx in tabletCols" :key="`${cx}-${cy}`">
            <ellipse :cx="cx" :cy="cy" rx="15" ry="13" fill="url(#gTab)" stroke="#BFC9C3" />
            <path
              :d="`M${cx - 9} ${cy - 4} a10 8 0 0 1 10 -5`"
              fill="none"
              stroke="#FFFFFF"
              stroke-width="2.6"
              stroke-linecap="round"
              opacity=".95"
            />
            <line :x1="cx - 7" :y1="cy" :x2="cx + 7" :y2="cy" stroke="#CBD4CE" />
          </template>
        </template>
        <text
          x="120" y="113" text-anchor="middle" font-family="Archivo,Helvetica,sans-serif"
          font-size="9" font-weight="700" fill="#17241D" letter-spacing=".2"
        >{{ label }}</text>
      </g>
    </template>

    <!-- capsules: two hard-gelatin capsules, green cap over ivory body -->
    <template v-else-if="slug === 'capsules'">
      <ellipse cx="122" cy="136" rx="58" ry="7" fill="#0E5C3F" opacity=".12" />
      <g v-for="c in [{ x: 44, y: 34, r: -14 }, { x: 66, y: 76, r: 9 }]" :key="c.y"
        :transform="`translate(${c.x} ${c.y}) rotate(${c.r})`">
        <rect x="30" y="0" width="48" height="29" rx="14.5" fill="url(#gCapB)" />
        <rect x="0" y="0" width="48" height="29" rx="14.5" fill="url(#gCapC)" />
        <rect x="0" y="0" width="78" height="29" rx="14.5" fill="none" stroke="#A9B3AD" />
        <rect x="9" y="5" width="28" height="5" rx="2.5" fill="#FFFFFF" opacity=".3" />
        <rect x="48" y="5" width="22" height="5" rx="2.5" fill="#FFFFFF" opacity=".75" />
      </g>
      <text
        x="120" y="147" text-anchor="middle" font-family="Archivo,Helvetica,sans-serif"
        font-size="9" font-weight="700" fill="#17241D" letter-spacing=".2"
      >{{ label }}</text>
    </template>

    <!-- syrups: amber glass bottle with label and measuring cup -->
    <template v-else-if="slug === 'syrups'">
      <ellipse cx="116" cy="136" rx="54" ry="7" fill="#0E5C3F" opacity=".12" />
      <rect x="100" y="12" width="34" height="17" rx="3" fill="url(#gGreenCap)" />
      <line x1="108" y1="15" x2="108" y2="26" stroke="#0A3F2C" />
      <line x1="117" y1="15" x2="117" y2="26" stroke="#0A3F2C" />
      <line x1="126" y1="15" x2="126" y2="26" stroke="#0A3F2C" />
      <rect x="106" y="29" width="22" height="13" fill="#C9D2CC" stroke="#AEB8B2" />
      <path d="M88 134V60c2-11 14-18 29-18s27 7 29 18v74a4 4 0 0 1-4 4H92a4 4 0 0 1-4-4z" fill="url(#gAmber)" stroke="#7C4711" />
      <rect x="95" y="58" width="7" height="64" rx="3.5" fill="#FFFFFF" opacity=".26" />
      <rect x="92" y="74" width="50" height="46" rx="3" fill="#FBFCFB" stroke="#CCD5CF" />
      <rect x="92" y="74" width="50" height="7" rx="3" fill="#0E5C3F" />
      <text
        x="117" y="96" text-anchor="middle" font-family="Archivo,Helvetica,sans-serif"
        font-size="7.5" font-weight="700" fill="#17241D" letter-spacing=".2"
      >{{ label }}</text>
      <rect x="100" y="102" width="34" height="3" rx="1.5" fill="#D4DCD7" />
      <rect x="104" y="109" width="26" height="3" rx="1.5" fill="#D4DCD7" />
      <path d="M166 104h34l-6 30h-22z" fill="url(#gGlass)" stroke="#BCC6C0" />
      <line x1="169" y1="118" x2="197" y2="118" stroke="#C4CDC7" />
    </template>

    <!-- injectables: crimp-capped vial beside a sealed ampoule -->
    <template v-else-if="slug === 'injectables'">
      <ellipse cx="116" cy="136" rx="56" ry="7" fill="#0E5C3F" opacity=".12" />
      <rect x="102" y="24" width="24" height="9" rx="2" fill="#17855B" />
      <rect x="94" y="32" width="40" height="15" rx="2" fill="url(#gMetal)" stroke="#9FA9A3" />
      <rect x="104" y="47" width="20" height="9" fill="url(#gGlass)" stroke="#BCC6C0" />
      <rect x="90" y="54" width="48" height="80" rx="6" fill="url(#gGlass)" stroke="#B4BEB8" />
      <path d="M91 88h46v40a5 5 0 0 1-5 5H96a5 5 0 0 1-5-5z" fill="#CFE4D8" opacity=".85" />
      <rect x="94" y="92" width="40" height="30" rx="2" fill="#FFFFFF" opacity=".93" />
      <text
        x="114" y="106" text-anchor="middle" font-family="Archivo,Helvetica,sans-serif"
        font-size="7" font-weight="700" fill="#17241D" letter-spacing=".2"
      >{{ label }}</text>
      <rect x="100" y="111" width="28" height="3" rx="1.5" fill="#D4DCD7" />
      <rect x="96" y="60" width="5" height="66" rx="2.5" fill="#FFFFFF" opacity=".55" />
      <rect x="168" y="30" width="7" height="14" rx="3.5" fill="url(#gGlass)" stroke="#BCC6C0" />
      <rect x="164" y="42" width="15" height="12" fill="url(#gGlass)" stroke="#BCC6C0" />
      <rect x="157" y="52" width="29" height="82" rx="6" fill="url(#gGlass)" stroke="#B4BEB8" />
      <path d="M158 92h27v36a6 6 0 0 1-6 6h-15a6 6 0 0 1-6-6z" fill="#CFE4D8" opacity=".85" />
      <rect x="157" y="60" width="29" height="5" fill="#B06A10" />
    </template>

    <!-- topicals: laminated tube with crimped seal -->
    <template v-else-if="slug === 'topicals'">
      <ellipse cx="120" cy="136" rx="50" ry="7" fill="#0E5C3F" opacity=".12" />
      <rect x="104" y="12" width="32" height="25" rx="4" fill="url(#gGreenCap)" />
      <line x1="112" y1="16" x2="112" y2="33" stroke="#0A3F2C" />
      <line x1="120" y1="16" x2="120" y2="33" stroke="#0A3F2C" />
      <line x1="128" y1="16" x2="128" y2="33" stroke="#0A3F2C" />
      <rect x="110" y="37" width="20" height="9" fill="#C9D2CC" stroke="#AEB8B2" />
      <path d="M80 128V78c7-19 21-32 40-32s33 13 40 32v50z" fill="url(#gWhite)" stroke="#B9C3BD" />
      <rect x="80" y="82" width="80" height="7" fill="#0E5C3F" />
      <text
        x="120" y="106" text-anchor="middle" font-family="Archivo,Helvetica,sans-serif"
        font-size="8.5" font-weight="700" fill="#17241D" letter-spacing=".2"
      >{{ label }}</text>
      <rect x="92" y="112" width="56" height="3" rx="1.5" fill="#D4DCD7" />
      <rect x="80" y="126" width="80" height="11" rx="2" fill="#C5CEC8" stroke="#A7B1AB" />
      <line v-for="x in [92, 104, 116, 128, 140, 148]" :key="x" :x1="x" y1="128" :x2="x" y2="135" stroke="#9BA6A0" />
    </template>

    <!-- nutra: HDPE supplement bottle with softgels alongside -->
    <template v-else>
      <ellipse cx="112" cy="136" rx="56" ry="7" fill="#0E5C3F" opacity=".12" />
      <rect x="86" y="16" width="56" height="21" rx="4" fill="url(#gGreenCap)" />
      <line v-for="x in [96, 106, 116, 126]" :key="x" :x1="x" y1="19" :x2="x" y2="34" stroke="#0A3F2C" />
      <rect x="80" y="35" width="68" height="99" rx="9" fill="url(#gWhite)" stroke="#B9C3BD" />
      <rect x="85" y="58" width="58" height="58" rx="4" fill="#EAF1EC" stroke="#CFD8D2" />
      <rect x="85" y="58" width="58" height="8" rx="4" fill="#0E5C3F" />
      <text
        x="114" y="84" text-anchor="middle" font-family="Archivo,Helvetica,sans-serif"
        font-size="8" font-weight="700" fill="#17241D" letter-spacing=".2"
      >{{ label }}</text>
      <rect x="94" y="92" width="40" height="3" rx="1.5" fill="#CBD5CF" />
      <rect x="99" y="100" width="30" height="3" rx="1.5" fill="#CBD5CF" />
      <rect x="104" y="108" width="20" height="3" rx="1.5" fill="#CBD5CF" />
      <ellipse cx="172" cy="116" rx="15" ry="10" transform="rotate(-18 172 116)" fill="url(#gSoft)" stroke="#8F5A13" />
      <ellipse cx="194" cy="129" rx="14" ry="9" transform="rotate(10 194 129)" fill="url(#gSoft)" stroke="#8F5A13" />
      <ellipse cx="167" cy="112" rx="5" ry="3" transform="rotate(-18 167 112)" fill="#FFFFFF" opacity=".5" />
    </template>
  </svg>
</template>
