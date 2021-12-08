
import consolePrintTable from './consolePrintTable'
import { attrs } from '../Item'
import { formatItem } from '../formatToString'
import { Table } from '../Table'

function isMultiColumn(rel: Table) {

    const columns = new Map();

    for (const item of rel.scan()) {
        for (const attr of attrs(item)) {

            columns.set(attr, true)

            if (columns.size > 1)
                return true;
        }
    }

    return false;
}

export function consoleFormatRelation(rel: Table): string[] {

    if (rel.hasError()) {
        return consoleFormatError(rel);
    }

    const out = [];

    for (const warn of rel.warnings())
        out.push(`#warning ${warn.warningType} ${warn.message || ''}`);

    if (isMultiColumn(rel)) {
        for (const line of consolePrintTable(rel)) {
            out.push('  ' + line);
        }
    } else {
        for (const item of rel.scan()) {
            out.push('  ' + formatItem(item));
        }
    }
    return out;
}

export function consoleFormatError(rel: Table) {
    return rel.errors().map(error => `Error: ${error.message}`)
}
