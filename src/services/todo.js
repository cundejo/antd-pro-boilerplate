export async function getFakeTodos() {
  const todos = [
    { key: '1', name: 'Task 1', date: '10/12/2019', done: true },
    { key: '2', name: 'Task 2', date: '10/01/2019', done: true },
    { key: '3', name: 'Task 3', date: '10/12/2019', done: false },
    { key: '4', name: 'Task 4', date: '10/05/2019', done: true },
    { key: '5', name: 'Task 5', date: '10/02/2019', done: false },
  ];

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: todos });
    }, 1000);
  });
}
