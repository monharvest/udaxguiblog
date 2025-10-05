const slugify = require('slugify');

function generateSlug(title) {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
    replacement: '-',
  });
}

const posts = [
  { id: 11, title: '"Та нар дахин төрөх ёстой"' },
  { id: 10, title: 'Төөрсөн хонины сургаалт зүйрлэл 2' },
  { id: 9, title: 'testwithslug' },
  { id: 8, title: 'Hайр ивээл' },
  { id: 7, title: 'Шинэ бүтээлд өнөөгийн махбод хамаагүй' },
  { id: 6, title: 'Паулын зарласан сайн мэдээ' },
  { id: 4, title: 'Хэмжээлшгүй их хайр ивээл' },
  { id: 3, title: 'Амилалтын найдвар' },
  { id: 2, title: 'Төөрсөн хонины сургаалт зүйрлэл' },
  { id: 1, title: 'Миний анхны нийтлэл1' }
];

posts.forEach(post => {
  console.log(`{ id: ${post.id}, title: '${post.title}', slug: '${generateSlug(post.title)}' },`);
});