import html from '../../helper/html'
import contents from '../../db/content'

export default function ContentDetail(slug: string) {
  for (const { body, date, tags, title, author } of contents) {
    const link = title.replace(/\s/gi, '-')
    if (slug === link) {
      return html`
<article class="bg-white shadow-lg rounded-lg p-4 mb-4">
  <h2 class="text-2xl font-bold text-gray-800">${title}</h2>
  <p class="text-gray-600 mt-2">${body}</p>
  <div class="flex items-center justify-between mt-4">
    <div class="flex items-center space-x-2 text-gray-600">
      <img src="https://picsum.photos/200/300" alt="${author}" class="w-8 h-8 rounded-full">
      <span>${author}</span>
    </img>
    <div class="text-gray-600">${date}</div>
  </div>
<div class="bg-white shadow-lg rounded-lg p-4 mb-4">
  <h3 class="text-xl font-bold text-gray-800">Tags</h3>
  <div class="flex flex-wrap mt-2">
    ${tags.map(val => html`
    <span class="bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2">${val}</span>
    `)}
  </div>
</div>
</article>
`
    }
  }
}
