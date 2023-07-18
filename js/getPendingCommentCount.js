export default function getPendingCommentCount() {
  return fetch('https://frontend-pink-theta.vercel.app/api/comments/pending-count')
    .then(response => response.json())
    .then(data => data.count)
    .catch(error => {
      console.error('Ошибка при получении количества неотвеченных комментариев:', error);
      throw error;
    });
}

