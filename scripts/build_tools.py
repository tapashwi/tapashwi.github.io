#!/usr/bin/env python3
"""Generate the static Free Tools pages (index.html and tools/<slug>/index.html).

GitHub Pages serves this repo as plain files with no build step, so the generated HTML is
committed. Edit the TOOLS list or the templates below, run
`python3 scripts/build_tools.py`, and commit the output.
The calculation logic lives in assets/calc/*.js and is tested by `node --test tests/calc.test.js`.
"""

from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://tapashwi.github.io"
MAIN = "https://explainer.tapaswibaskota.com.np"
BRAND = "Clear Explainer Tools"

TOOLS = [
    {
        "slug": "australian-income-tax-calculator",
        "name": "Australian Income Tax Calculator 2025–26",
        "short": "Tax, Medicare levy and take-home pay on any income, using the 2025–26 rates.",
        "title": "Australian Income Tax Calculator 2025–26 (with Medicare levy & LITO)",
        "description": "Work out income tax, the low income tax offset, Medicare levy and take-home pay for 2025–26 Australian residents. Free, instant, no sign-up.",
        "lede": "Enter your taxable income for 1 July 2025 – 30 June 2026. You get the tax on each slice of income, the low income tax offset, the Medicare levy and what you keep.",
        "calc": "au-tax",
        "form": """
<form class="card" id="f" novalidate>
  <label for="income">Taxable income for the year (AUD)</label>
  <input id="income" inputmode="decimal" value="65000" autocomplete="off">
  <div class="err" id="err" role="alert"></div>
  <div class="results" aria-live="polite">
    <div class="stat hero"><div class="k">Take-home pay</div><div class="v" id="take">–</div></div>
    <div class="stat"><div class="k">Total tax</div><div class="v" id="total">–</div></div>
    <div class="stat"><div class="k">Average rate</div><div class="v" id="avg">–</div></div>
    <div class="stat"><div class="k">Marginal rate (incl. Medicare)</div><div class="v" id="marg">–</div></div>
  </div>
  <div class="table-scroll"><table>
    <tbody>
      <tr><td>Income tax on brackets</td><td id="t1">–</td></tr>
      <tr><td>Less low income tax offset</td><td id="t2">–</td></tr>
      <tr><td>Tax after offsets</td><td id="t3">–</td></tr>
      <tr><td>Medicare levy</td><td id="t4">–</td></tr>
      <tr><th>Total</th><th id="t5">–</th></tr>
      <tr><td>Per fortnight take-home</td><td id="fn">–</td></tr>
    </tbody>
  </table></div>
</form>""",
        "script": """
var $ = function (id) { return document.getElementById(id); };
CE.bind($('f'), function () {
  var raw = $('income').value.replace(/[$,\\s]/g, '');
  var s = CE.auTax.summary(raw === '' ? 0 : raw);
  $('take').textContent = CE.money(s.takeHome);
  $('total').textContent = CE.money(s.totalTax);
  $('avg').textContent = CE.pct(s.averageRate);
  $('marg').textContent = CE.pct(s.marginalRate, 0);
  $('t1').textContent = CE.money(s.incomeTax);
  $('t2').textContent = '−' + CE.money(s.lito);
  $('t3').textContent = CE.money(s.taxAfterOffsets);
  $('t4').textContent = CE.money(s.medicareLevy);
  $('t5').textContent = CE.money(s.totalTax);
  $('fn').textContent = CE.money(s.takeHome / 26);
}, $('err'));""",
        "explainer": """
<h2>How the calculation works</h2>
<p>Australia taxes income in slices. Each rate applies only to the dollars inside its band, so moving into a higher bracket never makes your whole income more expensive. For 2025–26 the resident rates are:</p>
<div class="table-scroll"><table>
  <thead><tr><th>Taxable income</th><th>Rate on this slice</th></tr></thead>
  <tbody>
    <tr><td>$0 – $18,200</td><td>0%</td></tr>
    <tr><td>$18,201 – $45,000</td><td>16%</td></tr>
    <tr><td>$45,001 – $135,000</td><td>30%</td></tr>
    <tr><td>$135,001 – $190,000</td><td>37%</td></tr>
    <tr><td>$190,001 and over</td><td>45%</td></tr>
  </tbody>
</table></div>
<p>Two adjustments follow. The <strong>low income tax offset</strong> is worth $700 up to $37,500, falls by 5 cents per dollar to $325 at $45,000, then by 1.5 cents per dollar until it runs out at $66,667. It can only reduce tax to zero, never below. The <strong>Medicare levy</strong> is 2% of taxable income. Singles earning $28,011 or less pay none, and between $28,011 and $35,013 it phases in at 10 cents per dollar over the lower threshold.</p>
<p>Put together, a single resident pays no income tax until about $22,575, because the offset cancels the 16% on the first $4,375 above the tax-free threshold.</p>
<h3>Worked example: $65,771</h3>
<p>16% of $26,800 ($4,288) plus 30% of $20,771 ($6,231.30) is $10,519.30. The offset has almost run out at this income: $325 − 1.5% × $20,771 ≈ $13.44. Medicare levy is 2% × $65,771 = $1,315.42.</p>
<p class="note">Not included: the Medicare levy surcharge (for higher earners without private hospital cover), HELP/HECS repayments, the seniors offset, family Medicare thresholds and part-year residency. This is an estimate, not tax advice. Your notice of assessment is the final word.</p>""",
        "faqs": [
            ("How much tax do I pay on $100,000 in Australia in 2025–26?", "Income tax is $20,788, and the low income tax offset is nil at that income. Add the $2,000 Medicare levy for a total of $22,788, leaving about $77,212."),
            ("Does moving into a higher tax bracket lower my take-home pay?", "No. The higher rate applies only to the dollars above the bracket threshold, so every extra dollar still leaves you better off."),
            ("Who pays no Medicare levy?", "For 2025–26, singles with taxable income of $28,011 or less pay no levy, and those up to $35,013 pay a reduced amount. Some people who aren't entitled to Medicare can claim an exemption with a Medicare Entitlement Statement."),
        ],
        "related": ["compound-interest-calculator", "percentage-calculator", "days-between-dates"],
        "sources": [
            ("ATO — tax rates for Australian residents", "https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents"),
            ("ATO — low income tax offset", "https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/tax-offsets/low-income-tax-offset"),
            ("ATO — Medicare levy reduction for low-income earners", "https://www.ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-reduction/medicare-levy-reduction-for-low-income-earners"),
        ],
    },
    {
        "slug": "compound-interest-calculator",
        "name": "Compound Interest Calculator",
        "short": "See how savings and monthly contributions grow, year by year.",
        "title": "Compound Interest Calculator with Monthly Contributions",
        "description": "Project savings growth with a starting amount, monthly contributions and any compounding frequency. Year-by-year table, free and instant.",
        "lede": "Start with what you have, add a monthly amount, and see what time and a steady return do to it. The table shows how much came from you and how much from interest.",
        "calc": "compound",
        "form": """
<form class="card" id="f" novalidate>
  <div class="grid">
    <div><label for="p">Starting amount ($)</label><input id="p" inputmode="decimal" value="10000"></div>
    <div><label for="m">Monthly contribution ($)</label><input id="m" inputmode="decimal" value="250"></div>
    <div><label for="r">Annual interest / return (%)</label><input id="r" inputmode="decimal" value="6"></div>
    <div><label for="y">Years</label><input id="y" inputmode="numeric" value="15"></div>
    <div><label for="n">Compounding</label>
      <select id="n"><option value="12" selected>Monthly</option><option value="4">Quarterly</option><option value="1">Yearly</option><option value="365">Daily</option></select></div>
  </div>
  <div class="err" id="err" role="alert"></div>
  <div class="results" aria-live="polite">
    <div class="stat hero"><div class="k">Final balance</div><div class="v" id="fb">–</div></div>
    <div class="stat"><div class="k">You put in</div><div class="v" id="tc">–</div></div>
    <div class="stat"><div class="k">Interest earned</div><div class="v" id="ti">–</div></div>
  </div>
  <div class="table-scroll"><table>
    <thead><tr><th>Year</th><th>Contributed</th><th>Interest</th><th>Balance</th></tr></thead>
    <tbody id="rows"></tbody>
  </table></div>
</form>""",
        "script": """
var $ = function (id) { return document.getElementById(id); };
CE.bind($('f'), function () {
  var r = CE.compound.project({ principal: $('p').value || 0, monthly: $('m').value || 0, ratePct: $('r').value || 0,
    years: $('y').value, compoundsPerYear: $('n').value });
  $('fb').textContent = CE.money(r.finalBalance);
  $('tc').textContent = CE.money(r.totalContributed);
  $('ti').textContent = CE.money(r.totalInterest);
  $('rows').innerHTML = r.schedule.map(function (row) {
    return '<tr><td>' + row.year + '</td><td>' + CE.money(row.contributed) + '</td><td>' + CE.money(row.interest) +
      '</td><td>' + CE.money(row.balance) + '</td></tr>';
  }).join('');
}, $('err'));""",
        "explainer": """
<h2>How compound interest works</h2>
<p>Interest earns interest. In year one you earn a return on your deposit. In year two you earn it on the deposit <em>and</em> on last year's interest. The effect is small at first and large later, which is why the interest column in the table grows faster each year.</p>
<p>This calculator adds your contribution at the end of every month. It converts the annual rate into the matching monthly rate for the compounding you pick, using <code>(1 + r/n)^(n/12) − 1</code>, so contributions and compounding line up. With yearly compounding and no contributions it matches the textbook formula <code>P × (1 + r)^t</code> exactly.</p>
<h3>The rule of 72</h3>
<p>Divide 72 by the annual rate for a rough doubling time: at 6%, money doubles in about 12 years; at 8%, about 9.</p>
<p class="note">Returns on shares and funds aren't steady, and fees and tax reduce them. Treat the result as an illustration, not a forecast or financial advice.</p>""",
        "faqs": [
            ("How much will $10,000 grow to in 10 years at 5%?", "Compounded yearly with nothing added, about $16,289. Compounded monthly, about $16,470."),
            ("Does compounding frequency matter much?", "Less than people expect. At 6% a year, monthly compounding works out to about 6.17% a year instead of 6%. The rate and the time you stay invested matter far more."),
            ("Is the result before or after tax and fees?", "Before both. Enter a rate that already has fees taken off if you want a closer estimate."),
        ],
        "related": ["australian-income-tax-calculator", "percentage-calculator", "days-between-dates"],
        "sources": [("ASIC Moneysmart — compound interest", "https://moneysmart.gov.au/budgeting/compound-interest-calculator")],
    },
    {
        "slug": "percentage-calculator",
        "name": "Percentage Calculator",
        "short": "X% of Y, what percent one number is of another, and percentage change.",
        "title": "Percentage Calculator — Percent Of, What Percent, Percent Change",
        "description": "Three percentage calculators on one page: find X% of a number, what percent one number is of another, and the percentage increase or decrease.",
        "lede": "The three percentage questions people actually ask, each answered as you type.",
        "calc": "percent",
        "form": """
<form class="card" id="f" novalidate>
  <h3 style="margin-top:0">What is X% of Y?</h3>
  <div class="grid"><div><label for="a1">Percent</label><input id="a1" inputmode="decimal" value="15"></div>
    <div><label for="a2">Of</label><input id="a2" inputmode="decimal" value="240"></div></div>
  <div class="results"><div class="stat hero"><div class="k">Answer</div><div class="v" id="ra">–</div></div></div>
  <h3>X is what percent of Y?</h3>
  <div class="grid"><div><label for="b1">Part</label><input id="b1" inputmode="decimal" value="36"></div>
    <div><label for="b2">Whole</label><input id="b2" inputmode="decimal" value="240"></div></div>
  <div class="results"><div class="stat hero"><div class="k">Answer</div><div class="v" id="rb">–</div></div></div>
  <h3>Percentage change from A to B</h3>
  <div class="grid"><div><label for="c1">From</label><input id="c1" inputmode="decimal" value="80"></div>
    <div><label for="c2">To</label><input id="c2" inputmode="decimal" value="100"></div></div>
  <div class="results"><div class="stat hero"><div class="k">Change</div><div class="v" id="rc">–</div></div></div>
  <div class="err" id="err" role="alert"></div>
</form>""",
        "script": """
var $ = function (id) { return document.getElementById(id); };
CE.bind($('f'), function () {
  $('ra').textContent = CE.number(CE.percent.of($('a1').value, $('a2').value), 4);
  $('rb').textContent = CE.number(CE.percent.whatPercent($('b1').value, $('b2').value), 4) + '%';
  var c = CE.percent.change($('c1').value, $('c2').value);
  $('rc').textContent = (c > 0 ? '+' : '') + CE.number(c, 4) + '%';
}, $('err'));""",
        "explainer": """
<h2>The three formulas</h2>
<ul>
  <li><strong>X% of Y</strong> = X ÷ 100 × Y. 15% of 240 is 0.15 × 240 = 36.</li>
  <li><strong>X is what % of Y</strong> = X ÷ Y × 100. 36 of 240 is 15%.</li>
  <li><strong>% change from A to B</strong> = (B − A) ÷ |A| × 100. From 80 to 100 is +25%.</li>
</ul>
<h3>The trap: up then down is not even</h3>
<p>A 25% rise followed by a 25% fall doesn't bring you back where you started. 80 up 25% is 100; 100 down 25% is 75. The second change is measured from a bigger base. That's why a share that falls 50% needs a 100% gain to recover.</p>
<h3>Percent vs percentage points</h3>
<p>If an interest rate goes from 4% to 5%, it rose by <em>one percentage point</em>, but by <em>25 percent</em>. News reports mix these up often.</p>""",
        "faqs": [
            ("How do I work out a percentage increase?", "Subtract the old value from the new one, divide by the old value, and multiply by 100. From 80 to 100: (100 − 80) ÷ 80 × 100 = 25%."),
            ("How do I add GST of 10% to a price?", "Multiply by 1.1. To remove GST from a price that includes it, divide by 1.1, which is not the same as taking 10% off."),
            ("What is the difference between percent and percentage points?", "Percentage points are the plain difference between two percentages. Percent change is that difference relative to the starting value."),
        ],
        "related": ["compound-interest-calculator", "australian-income-tax-calculator", "word-counter"],
        "sources": [],
    },
    {
        "slug": "word-counter",
        "name": "Word Counter & Reading Time",
        "short": "Words, characters, sentences, and how long it takes to read or say aloud.",
        "title": "Word Counter — Words, Characters & Reading Time",
        "description": "Paste text to count words, characters (with and without spaces), sentences and paragraphs, plus reading and speaking time. Nothing leaves your browser.",
        "lede": "Paste or type below. Everything is counted in your browser, and nothing is uploaded.",
        "calc": "text",
        "form": """
<form class="card" id="f" novalidate>
  <label for="t">Your text</label>
  <textarea id="t" placeholder="Paste your text here…"></textarea>
  <div class="err" id="err" role="alert"></div>
  <div class="results" aria-live="polite">
    <div class="stat hero"><div class="k">Words</div><div class="v" id="w">0</div></div>
    <div class="stat"><div class="k">Characters</div><div class="v" id="c">0</div></div>
    <div class="stat"><div class="k">Without spaces</div><div class="v" id="cn">0</div></div>
    <div class="stat"><div class="k">Sentences</div><div class="v" id="s">0</div></div>
    <div class="stat"><div class="k">Paragraphs</div><div class="v" id="pa">0</div></div>
    <div class="stat"><div class="k">Reading time</div><div class="v" id="rt">–</div></div>
    <div class="stat"><div class="k">Speaking time</div><div class="v" id="st">–</div></div>
  </div>
</form>""",
        "script": """
var $ = function (id) { return document.getElementById(id); };
CE.bind($('f'), function () {
  var r = CE.text.analyse($('t').value);
  $('w').textContent = CE.number(r.words, 0);
  $('c').textContent = CE.number(r.characters, 0);
  $('cn').textContent = CE.number(r.charactersNoSpaces, 0);
  $('s').textContent = CE.number(r.sentences, 0);
  $('pa').textContent = CE.number(r.paragraphs, 0);
  $('rt').textContent = r.words ? CE.minutes(r.readingMinutes) : '–';
  $('st').textContent = r.words ? CE.minutes(r.speakingMinutes) : '–';
}, $('err'));""",
        "explainer": """
<h2>How the counts are made</h2>
<p>A word is any run of characters between spaces that contains at least one letter or digit, so a lone dash or bullet doesn't count. Characters are counted as the letters you see, including emoji and accented letters, not as bytes.</p>
<h3>Where the reading time comes from</h3>
<p>Reading time uses <strong>238 words per minute</strong>, the average for silent reading of English non-fiction in a 2019 meta-analysis of 190 studies by Marc Brysbaert. Speaking time uses <strong>150 words per minute</strong>, a comfortable pace for a talk or voice-over. A one-minute video script is roughly 140–160 words.</p>
<h3>Common length limits</h3>
<ul>
  <li>Meta description: aim for about 150–160 characters before search results cut it off.</li>
  <li>X (Twitter) post: 280 characters on a free account.</li>
  <li>YouTube title: 100 characters, with roughly the first 70 visible in search.</li>
</ul>""",
        "faqs": [
            ("How long does it take to read 1,000 words?", "About 4 minutes 12 seconds at the average silent reading speed of 238 words per minute."),
            ("How many words is a 1-minute speech?", "About 150 words at a normal speaking pace; 130 if you speak slowly and clearly."),
            ("Is my text uploaded anywhere?", "No. The counting runs in your browser, and the page never sends your text to a server."),
        ],
        "related": ["percentage-calculator", "days-between-dates", "compound-interest-calculator"],
        "sources": [("Brysbaert (2019), How many words do we read per minute?", "https://doi.org/10.1016/j.jml.2019.104047")],
    },
    {
        "slug": "days-between-dates",
        "name": "Days Between Dates",
        "short": "Count calendar days and weekdays between two dates.",
        "title": "Days Between Dates Calculator — Calendar Days & Weekdays",
        "description": "Count the days, weeks and weekdays between two dates, with or without the end date. Handles leap years. Free and instant.",
        "lede": "Pick two dates. You get calendar days, weeks and weekdays (Monday to Friday), with the option to count both the start and end date.",
        "calc": "dates",
        "form": """
<form class="card" id="f" novalidate>
  <div class="grid">
    <div><label for="a">Start date</label><input id="a" type="date" value="2025-07-01"></div>
    <div><label for="b">End date</label><input id="b" type="date" value="2026-06-30"></div>
  </div>
  <label class="check"><input id="inc" type="checkbox" checked> Include the end date (count both days)</label>
  <div class="err" id="err" role="alert"></div>
  <div class="results" aria-live="polite">
    <div class="stat hero"><div class="k">Calendar days</div><div class="v" id="d">–</div></div>
    <div class="stat"><div class="k">Weeks + days</div><div class="v" id="wk">–</div></div>
    <div class="stat"><div class="k">Weekdays (Mon–Fri)</div><div class="v" id="wd">–</div></div>
  </div>
</form>""",
        "script": """
var $ = function (id) { return document.getElementById(id); };
CE.bind($('f'), function () {
  var r = CE.dates.between($('a').value, $('b').value, { inclusive: $('inc').checked });
  $('d').textContent = CE.number(r.days, 0);
  $('wk').textContent = r.weeks + ' w ' + r.remainderDays + ' d';
  $('wd').textContent = CE.number(r.weekdays, 0);
}, $('err'));""",
        "explainer": """
<h2>Counting days correctly</h2>
<p>The one choice that changes the answer is whether you count the end date. From 1 July to 3 July is <strong>2 days</strong> apart, but <strong>3 days</strong> if you're counting days covered, like nights in a hotel versus days on a booking. Periods measured "from" one date "to" another in forms and contracts often count both days, so the box is ticked by default. Untick it for plain elapsed time.</p>
<p>Dates are worked out in UTC, so a daylight-saving change can't make a day disappear or appear twice. Leap years are handled: 2028 has a 29 February, 2026 does not.</p>
<h3>Example: part of a financial year</h3>
<p>1 July 2025 to 3 April 2026, counting both dates, is 277 days. This kind of count matters for things like part-year tax residency or the Medicare levy exemption, where the number of days is entered on a form.</p>
<p class="note">Weekdays exclude Saturdays and Sundays only. Public holidays differ by state and are not removed.</p>""",
        "faqs": [
            ("How many days are in the 2025–26 financial year?", "365. 1 July 2025 to 30 June 2026 has no 29 February, so counting both ends gives 365 days."),
            ("Should I include the end date?", "Include it when you're counting days covered, such as leave or residency days. Leave it out for elapsed time, such as how long until an event."),
            ("Are public holidays excluded from weekdays?", "No. Only Saturdays and Sundays are excluded, because public holidays vary by state."),
        ],
        "related": ["australian-income-tax-calculator", "word-counter", "percentage-calculator"],
        "sources": [],
    },
]

BY_SLUG = {t["slug"]: t for t in TOOLS}
E = html.escape


def head(title: str, description: str, canonical: str, jsonld: list[dict]) -> str:
    ld = "\n".join(
        f'<script type="application/ld+json">{json.dumps(obj, ensure_ascii=False)}</script>' for obj in jsonld
    )
    return f"""<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{E(title)}</title>
<meta name="description" content="{E(description)}">
<link rel="canonical" href="{canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="{E(title)}">
<meta property="og:description" content="{E(description)}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{SITE}/assets/banner-2048x1152.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#070b12">
<link rel="icon" href="/assets/logo.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/tools.css">
{ld}
</head>"""


def header() -> str:
    return f"""<body>
<header class="site-head"><div class="wrap">
  <a class="brand" href="/">Clear <em>Explainer</em> Tools</a>
  <nav><a href="/">All tools</a><a href="{MAIN}/news">News</a><a href="{MAIN}/blog">Explainers</a></nav>
</div></header>
<main class="wrap">"""


def footer(extra_scripts: str = "") -> str:
    return f"""</main>
<footer class="site-foot"><div class="wrap">
  <p>Free tools from <a href="{MAIN}/">Clear Explainer</a>: explainers and a daily news briefing, written to be checked.
  Calculations run in your browser. Nothing you type is sent anywhere.</p>
  <p><a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></p>
</div></footer>
<script src="/assets/site-config.js"></script>
{extra_scripts}
<script src="/assets/tools.js"></script>
</body>
</html>
"""


def cta() -> str:
    return f"""<section class="cta">
  <p><strong>Want the story behind the numbers?</strong> Clear Explainer publishes a daily news briefing and plain-English explainers on money, tech and the world.</p>
  <a class="btn" href="{MAIN}/news">Read today's briefing</a>
</section>"""


def tool_page(t: dict) -> str:
    url = f"{SITE}/tools/{t['slug']}/"
    faq_ld = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in t["faqs"]
        ],
    }
    app_ld = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": t["name"],
        "url": url,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": {"@type": "Offer", "price": "0", "priceCurrency": "AUD"},
        "description": t["description"],
    }
    crumbs_ld = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Tools", "item": f"{SITE}/"},
            {"@type": "ListItem", "position": 2, "name": t["name"], "item": url},
        ],
    }
    faqs = "\n".join(f"<details><summary>{E(q)}</summary><p>{E(a)}</p></details>" for q, a in t["faqs"])
    related = "\n".join(
        f'<li><a href="/tools/{s}/"><strong>{E(BY_SLUG[s]["name"])}</strong><span>{E(BY_SLUG[s]["short"])}</span></a></li>'
        for s in t["related"]
    )
    sources = ""
    if t["sources"]:
        items = "".join(f'<li><a href="{u}" rel="noopener">{E(n)}</a></li>' for n, u in t["sources"])
        sources = f'<h2>Sources</h2><ul class="note">{items}</ul>'
    scripts = f'<script src="/assets/calc/{t["calc"]}.js"></script>\n<script src="/assets/tools-page-{t["calc"]}.js" defer></script>'
    return "\n".join(
        [
            head(t["title"], t["description"], url, [app_ld, faq_ld, crumbs_ld]),
            header(),
            f'<p class="crumbs"><a href="/">Tools</a> › {E(t["name"])}</p>',
            f"<h1>{E(t['name'])}</h1>",
            f'<p class="lede">{E(t["lede"])}</p>',
            t["form"].strip(),
            '<div class="ad" data-slot="tool-mid"></div>',
            f'<article class="prose">{t["explainer"].strip()}</article>',
            f"<h2>Questions people ask</h2>\n{faqs}",
            sources,
            cta(),
            f'<h2>More free tools</h2>\n<ul class="tool-list">{related}</ul>',
            footer(scripts),
        ]
    )


def hub_page() -> str:
    items = "\n".join(
        f'<li><a href="/tools/{t["slug"]}/"><strong>{E(t["name"])}</strong><span>{E(t["short"])}</span></a></li>'
        for t in TOOLS
    )
    title = "Free Calculators & Tools — Clear Explainer"
    desc = "Free, fast tools that explain their own maths: Australian income tax 2025–26, compound interest, percentages, word count and days between dates. No sign-up."
    site_ld = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": title,
        "url": f"{SITE}/",
        "hasPart": [{"@type": "WebApplication", "name": t["name"], "url": f"{SITE}/tools/{t['slug']}/"} for t in TOOLS],
    }
    return "\n".join(
        [
            head(title, desc, f"{SITE}/", [site_ld]),
            header(),
            "<h1>Free tools that show their working</h1>",
            '<p class="lede">Quick calculators for the questions that come up in real life, each with a plain explanation of the maths behind the answer. Free, no sign-up, and nothing you type leaves your browser.</p>',
            f'<ul class="tool-list">{items}</ul>',
            '<div class="ad" data-slot="hub-mid"></div>',
            cta(),
            footer(),
        ]
    )


def main() -> None:
    for t in TOOLS:
        # Page behaviour lives in its own file so the HTML stays static and cacheable.
        (ROOT / "assets" / f"tools-page-{t['calc']}.js").write_text(t["script"].strip() + "\n", encoding="utf-8")
        out = ROOT / "tools" / t["slug"] / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(tool_page(t), encoding="utf-8")
    (ROOT / "tools" / "index.html").write_text(
        f'<!doctype html><meta charset="utf-8"><title>Tools</title><link rel="canonical" href="{SITE}/">'
        f'<meta http-equiv="refresh" content="0; url=/"><a href="/">All tools</a>\n',
        encoding="utf-8",
    )
    (ROOT / "index.html").write_text(hub_page(), encoding="utf-8")
    write_sitemap()
    print(f"built hub + {len(TOOLS)} tool pages")


def write_sitemap() -> None:
    """Hub, every tool, and any old post whose canonical is still on this host."""
    import re

    urls = [f"{SITE}/"] + [f"{SITE}/tools/{t['slug']}/" for t in TOOLS]
    for post in sorted((ROOT / "blog" / "posts").glob("*.html")):
        text = post.read_text(encoding="utf-8")
        m = re.search(r'<link rel="canonical" href="([^"]+)"', text)
        if m and m.group(1).startswith(SITE) and 'content="noindex"' not in text:
            urls.append(m.group(1).replace("%", "%25"))
    body = "".join(f"  <url><loc>{u}</loc></url>\n" for u in urls)
    (ROOT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + body + "</urlset>\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
