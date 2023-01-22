import datetime
import pytest

from posten_service import get_next_delivery_days, is_post_code_valid

def test_get_next_delivery_days(mocker):
    data = [
        "i morgen tirsdag 17. januar", "torsdag 19. januar", "mandag 23. januar", 
        "onsdag 25. januar", "fredag 27. januar"
    ]
    mocker.patch("posten_service._fetch", return_value=data)

    delivery_days = get_next_delivery_days(2000)

    next = datetime.date(2023, 1, 17)
    after = datetime.date(2023, 1, 19)

    assert delivery_days == (next, after)

def test_post_code_is_valid():
    assert is_post_code_valid("2000")

def test_non_numeric_post_codeis_invalid():
    assert not is_post_code_valid("abcd")

def test_british_post_code_is_invalid():
    assert not is_post_code_valid("M16 0RA")

def test_too_long_post_code_is_invalid():
    assert not is_post_code_valid("20000")

def test_too_short_post_code_is_invalid():
    assert not is_post_code_valid("200")

def test_exception_is_raised_with_invalid_post_code():
    with pytest.raises(ValueError):
        get_next_delivery_days("12345")
