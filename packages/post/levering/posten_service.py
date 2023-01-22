import datetime
import re
import requests

MONTHS = [
    None, "januar", "februar", "mars", "april", "mai", "juni", "juli", "august",
    "september", "oktober", "november", "desember"
]

def _fetch(post_code):
    if not is_post_code_valid(post_code):
        raise ValueError("Post code should consist of four digits")

    headers = {"x-requested-with": "XMLHttpRequest"}
    response = requests.get(f"https://www.posten.no/levering-av-post/_/component/main/1/leftRegion/1?postCode={post_code}", headers=headers)

    return response.json()["nextDeliveryDays"]

def _parse(data):
    def convert(text):
        match = re.search(r"(\d+). ([a-z]+)", text)
        
        year = datetime.date.today().year
        month = MONTHS.index(match.group(2))
        day = int(match.group(1))

        return datetime.date(year, month, day)
    
    next, after, *_ = data
    return convert(next), convert(after)

def is_post_code_valid(post_code):
    if not post_code:
        return False
    m = re.match(r"^\d{4}$", post_code)
    return bool(m)


def get_next_delivery_days(post_code):
    data = _fetch(post_code)
    return _parse(data)
