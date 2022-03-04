export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "RealTimeChatApp": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "api": {
        "RealTimeChatApp": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "function": {
        "RealTimeChatAppPostConfirmation": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        }
    },
    "storage": {
        "s3d6dbdd5b": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}