"use client";
import { useState, type ReactNode } from "react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Braces, CheckSquare, ChevronDown, Code2, Eraser, FileUp, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Highlighter, ImagePlus, IndentDecrease, IndentIncrease, Italic, Link2, List, ListOrdered, Minus, Pilcrow, Quote, Redo2, Strikethrough, Table2, Underline, Undo2, type LucideIcon } from "lucide-react";

// Match NotesVoicePage's ToolbarButton groups, order, icons and native CSS.
// Formatting is presented as part of the automated tour, without changing the supplied transcript.
const groups: [string, LucideIcon][][] = [
    [["Undo", Undo2], ["Redo", Redo2]],
    [["Bold", Bold], ["Italic", Italic], ["Underline", Underline], ["Strikethrough", Strikethrough], ["Inline code", Code2], ["Highlight", Highlighter]],
    [["Heading 1", Heading1], ["Heading 2", Heading2], ["Heading 3", Heading3], ["Heading 4", Heading4], ["Heading 5", Heading5], ["Heading 6", Heading6], ["Paragraph", Pilcrow], ["Quote", Quote], ["Code block", Braces], ["Divider", Minus]],
    [["Align left", AlignLeft], ["Align center", AlignCenter], ["Align right", AlignRight], ["Justify", AlignJustify]],
    [["Bullet list", List], ["Numbered list", ListOrdered], ["Checklist", CheckSquare], ["Indent list item", IndentIncrease], ["Outdent list item", IndentDecrease]],
    [["Insert table", Table2]],
    [["Insert link", Link2], ["Insert image", ImagePlus], ["Import Markdown, HTML, or text file as a new note", FileUp], ["Clear formatting", Eraser]],
];

export default function NoteEditorToolbar({ className, followControl, children }: { className: string; followControl: ReactNode; children: ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    return <fieldset className={"notes-voice-toolbar " + className} data-notes-voice-toolbar="true" aria-label="Editor tools">
        <div className="notes-voice-toolbar-heading">
            <div><p data-notes-voice-secondary="true">Editor tools</p><p data-notes-voice-secondary="true">Transcript ready</p></div>
            <div className="notes-voice-toolbar-heading-actions">{followControl}<button className="notes-voice-collapse-button" type="button" onClick={() => setCollapsed(value => !value)} aria-expanded={!collapsed} aria-label={collapsed ? "Expand editor toolbar" : "Collapse editor toolbar"} title={collapsed ? "Expand editor toolbar" : "Collapse editor toolbar"}><ChevronDown/></button></div>
        </div>
        <div className="notes-voice-toolbar-controls" hidden={collapsed}>
            {groups.map((group, index) => <div className="transcript-editor-tool-group" key={index} inert>
                {index > 0 && <div className="notes-voice-tool-divider" aria-hidden="true"/>}
                {group.map(([title, Icon]) => <button className="notes-voice-tool-button" type="button" title={title} aria-label={title} aria-pressed={title === "Paragraph" || title === "Align left"} disabled={title === "Undo" || title === "Redo"} key={title}><Icon/></button>)}
            </div>)}
            {children}
        </div>
    </fieldset>;
}
