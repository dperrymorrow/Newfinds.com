Ever struggle with content editable or other WYSIWYG solutions? Its difficult to say the least. I recently had to create a JSON editor for something i was working on at work and I found the _mirror_ approach to be much easier to develop and maintain.

The solution relies mostly on CSS solution. You have a textarea with color set to transparent using `rgba(255, 255, 255, 0)` this makes the acutal textarea you are editing sit on top of your preview which lies on a `z-index` underneath.

> In order for any of this to work, you have to be dealing with a Monospace font for the preview and the textarea. Otherwise bold and italic versions of the font would have different widths and not match up.
