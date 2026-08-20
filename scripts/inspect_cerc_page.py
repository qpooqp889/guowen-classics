import requests
from bs4 import BeautifulSoup
url = "https://cerclearning.tp.edu.tw/classical/datapage/134"
soup = BeautifulSoup(requests.get(url, timeout=30).text, "html.parser")
text = soup.get_text("\n", strip=True)
with open("/home/ubuntu/guowen-classics/cerc-page-inspect.txt", "w", encoding="utf-8") as f:
    f.write(text)
print(text[:6000])
