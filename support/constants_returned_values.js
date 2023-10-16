not_found = (response, status, error, path) => JSON.stringify({
    'status': {
        'path': response.status,
        'expect': status
    },
    'error': {
        'path': response.error,
        'expect': error
    },
    'path': {
        'path': response.path,
        'expect': path
    }
})
Unprocessable_Entify = (response, globalMessage, message) => JSON.stringify({
  'globalMessage': {
      'path': response.globalMessage,
      'expect': globalMessage
  },
  'messages': {
    'path': response.messages[0].message,
    'expect': message
    }
})
Unprocessable_Entify2 = (response, globalMessage, message) => JSON.stringify({
    'globalMessage': {
        'path': response.globalMessage,
        'expect': globalMessage
    },
    'messages': {
      'path': response.messages[0].message,
      'expect': message
      }
  
  })
