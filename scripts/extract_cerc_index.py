import json
import re
from urllib.parse import urljoin
import requests
from bs4 import BeautifulSoup

BASE = "https://cerclearning.tp.edu.tw"
urls = [f"{BASE}/classical"] + [f"{BASE}/classical/index/{i}" for i in range(1, 5)]
items = {}
for url in urls:
    html = requests.get(url, timeout=30).text
    soup = BeautifulSoup(html, "html.parser")
    for a in soup.select('a[href*="/classical/datapage/"]'):
        href = urljoin(BASE, a.get("href", ""))
        if re.fullmatch(r"https://cerclearning\.tp\.edu\.tw/classical/datapage/\d+", href):
            title = " ".join(a.get_text(" ", strip=True).split())
            if title and title not in {"原文", "作者簡介", "導讀", "古典名篇"}:
                items[title] = href
out = [{"title": title, "source": href} for title, href in sorted(items.items())]
with open("/home/ubuntu/guowen-classics/cerc-index.json", "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)
print(json.dumps({"count": len(out), "sample": out[:5]}, ensure_ascii=False))
