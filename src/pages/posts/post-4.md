---
layout: ../../layouts/MarkdownPostLayout.astro
title: Моя четвёртая запись в блоге
author: Ученик Astro
description: "Этот пост появится сам по себе!"
image:
  url: "https://docs.astro.build/default-og-image.png"
  alt: "Слово «astro» на фоне иллюстрации планет и звезд."
pubDate: 2022-08-08
tags: ["astro", "успехи"]
---
Этот пост должен отображаться вместе с другими моими записями в блоге, потому что `import.meta.glob()` возвращает список всех моих постов для создания списка.