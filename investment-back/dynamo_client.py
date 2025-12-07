import boto3
import os

AWS_REGION = os.getenv("AWS_REGION", "us-east-1")

dynamodb = boto3.resource(
    "dynamodb",
    region_name=AWS_REGION,
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
)

USER_TABLE = dynamodb.Table("easyfundDynamoDB")

