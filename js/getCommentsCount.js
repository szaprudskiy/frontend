export function getCommentsCount() {
    return fetch('http://localhost:3000/api/comments/count')
    .then(response => response.json())
    .then(data => data.count)
    .catch(error => {
      console.error('Ошибка при получении количества комментариев:', error);
      throw error;
    });
  }