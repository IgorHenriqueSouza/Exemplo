retornoNegativo = () => JSON.stringify({
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "timestamp": {
        "type": "string"
      },
      "status": {
        "type": "integer"
      },
      "error": {
        "type": "string"
      },
      "message": {
        "type": "string"
      },
      "path": {
        "type": "string"
      }
    },
    "required": [
      "timestamp",
      "status",
      "error",
      "message",
      "path"
    ]
  })
  