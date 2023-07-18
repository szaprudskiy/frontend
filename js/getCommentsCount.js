export function getCommentsCount() {
    return fetch('https://frontend-pink-theta.vercel.app/api/comments/count')
    .then(response => response.json())
    .then(data => data.count)
    .catch(error => {
      console.error('Ошибка при получении количества комментариев:', error);
      throw error;
    });
  }