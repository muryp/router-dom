import html from '../../helper/html'
import content from '../../db/content'

export default html`
<div class="grid grid-cols-3 gap-4">
  <div class="col-span-2">
    ${content.map(({ date, title, author }) => {
    const link = title.replace(/\s/gi, '-')
    return html`
    <a href="${link}">
      <div class="bg-white shadow-lg rounded-lg p-4 mb-4">
        <h2 class="text-2xl font-bold text-gray-800">${title}</h2>
        <div class="flex items-center justify-between mt-4">
          <div class="flex items-center space-x-2 text-gray-600">
            <img src="https://picsum.photos/200/300" alt="${author}" class="w-8 h-8 rounded-full">
            <span>${author}</span>
            </img>
            <div class="text-gray-600">${date}</div>
          </div>
        </div>
      </div>
    </a>
    `
  })}
  </div>
</div>
`
