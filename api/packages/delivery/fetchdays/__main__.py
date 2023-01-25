import json
from http import HTTPStatus

from posten_service import get_next_delivery_days, is_post_code_valid

def main(args):
    post_code = args.get("postcode")

    if not is_post_code_valid(post_code):
        return { "statusCode": HTTPStatus.BAD_REQUEST }

    try:
        days = get_next_delivery_days("2000")
    except:
        return { "statusCode": HTTPStatus.INTERNAL_SERVER_ERROR }
    
    return {"body": json.dumps(days, default=str)}
  