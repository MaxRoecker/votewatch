import type { Options as ParseOptions, Parser } from 'csv-parse';
import { createReadStream } from 'node:fs';
import { parse } from 'csv-parse';
import billsCSV from './bills.csv';

export type Bill = {
  id: string;
  title: string;
  sponsorId: string;
};

export type ListBillsOptions = {
  limit?: number;
  offset?: number;
};

export async function listBills(
  options: ListBillsOptions = {},
): Promise<Array<Bill>> {
  const { limit = Infinity, offset = 0 } = options;
  const from = offset + 1;
  const to = Number.isInteger(limit) ? offset + limit : undefined;
  const parser = buildParser({ from, to });
  const bills: Array<Bill> = [];
  for await (const bill of parser) {
    bills.push(bill);
  }
  return bills;
}

export async function retrieveBill(id: string): Promise<Bill | undefined> {
  const parser = buildParser();
  for await (const bill of parser) {
    if (bill.id === id) return bill;
  }
  return undefined;
}

function buildParser(options: ParseOptions = {}): Parser {
  const columns = true;
  const trim = true;
  const onRecord = parseBillRecord;
  const parseOptions = { columns, trim, onRecord, ...options };
  const filepath = new URL(`../public/${billsCSV}`, import.meta.url);
  return createReadStream(filepath.pathname).pipe(parse(parseOptions));
}

function parseBillRecord(record: Record<string, string>): Bill {
  return {
    id: record['id'],
    title: record['title'],
    sponsorId: record['sponsor_id'],
  };
}
