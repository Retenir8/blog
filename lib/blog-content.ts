export const categories = [
  'AI',
  '科研',
  '竞赛',
  '产品',
  '创业',
  '成长',
  '其他',
];
export const thoughts: {id:string;date:string;content:string;tags:string[];post?:string}[] = [
  {
    id: 'one',
    date: '2026.09.23',
    content: '你透支健康换来的优秀，不过是人事档案里随时可替换的几行宋体字。而单位的运转齿轮从未因此停滞半分。人生不是用红头文件衡量的，而是用看见的花开、听见雨声的瞬间拼凑的。毕竟，你熬的夜、拼的命、流的泪，最后都成了档案袋里轻飘飘白A4纸，而你错过的晚霞、失约的晚餐、没牵到的手，才是永远无法补录的人生正文。',
    tags: [],
  },
];
export const knowledgeNodes = [
  {
    id: 'ai',
    name: 'AI',
    color: '#9cc8df',
    x: 50,
    y: 13,
    related: ['research', 'product'],
  },
  {
    id: 'research',
    name: '科研',
    color: '#aabcc8',
    x: 20,
    y: 33,
    related: ['ai', 'competition', 'growth'],
  },
  {
    id: 'product',
    name: '产品',
    color: '#a7cac2',
    x: 80,
    y: 33,
    related: ['ai', 'startup'],
  },
  {
    id: 'competition',
    name: '竞赛',
    color: '#ddc5a4',
    x: 20,
    y: 70,
    related: ['research', 'growth'],
  },
  {
    id: 'startup',
    name: '创业',
    color: '#c9c1b3',
    x: 80,
    y: 70,
    related: ['product'],
  },
  {
    id: 'growth',
    name: '成长',
    color: '#bcb5ce',
    x: 50,
    y: 88,
    related: ['research', 'competition'],
  },
];
