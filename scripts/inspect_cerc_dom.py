import requests
from bs4 import BeautifulSoup
soup = BeautifulSoup(requests.get("https://cerclearning.tp.edu.tw/classical/datapage/134", timeout=30).text, "html.parser")
for node in soup.find_all(string=lambda s: s and "原文第1段" in s):
    print("NODE", repr(node), "PARENT", node.parent.name, node.parent.get("class"), node.parent.get("id"))
    print(node.parent.parent.prettify()[:5000])
    break
for node in soup.find_all(string=lambda s: s and "段落語譯" in s):
    print("TRANSLATION", repr(node), "PARENT", node.parent.name, node.parent.get("class"), node.parent.get("id"))
    print(node.parent.parent.prettify()[:3000])
    break
