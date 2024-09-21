document.addEventListener('DOMContentLoaded', () => {
  // Initialize the Kanban board
  const boardContainer = document.getElementById('board-container');

  // Create columns
  const columns = [
    { id: 1, title: 'To-Do' },
    { id: 2, title: 'In Progress' },
    { id: 3, title: 'Done' }
  ];

  // Create cards
  const cards = [
    { id: 1, title: 'Card 1', columnId: 1 },
    { id: 2, title: 'Card 2', columnId: 1 },
    { id: 3, title: 'Card 3', columnId: 2 },
    { id: 4, title: 'Card 4', columnId: 3 }
  ];

  // Render columns
  columns.forEach((column) => {
    const columnElement = document.createElement('div');
    columnElement.className = 'column';
    columnElement.innerHTML = `<h2>${column.title}</h2>`;
    boardContainer.appendChild(columnElement);

    // Render cards
    const columnCards = cards.filter((card) => card.columnId === column.id);
    columnCards.forEach((card) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'card';
      cardElement.innerHTML = `<p>${card.title}</p>`;
      columnElement.appendChild(cardElement);
    });
  });
