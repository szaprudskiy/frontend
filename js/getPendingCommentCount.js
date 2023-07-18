export default function getPendingCommentCount() {
  return fetch('http://localhost:3000/api/comments/pending-count')
    .then(response => response.json())
    .then(data => data.count)
    .catch(error => {
      console.error('Ошибка при получении количества неотвеченных комментариев:', error);
      throw error;
    });
}

