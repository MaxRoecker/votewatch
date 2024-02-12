import type { Options as ParseOptions, Parser } from 'csv-parse';
import { createReadStream } from 'node:fs';
import { parse } from 'csv-parse';
import billsCSV from './bills.csv';

export type Bill = {
  id: string;
  title: string;
  sponsorId: string;
};

export type FindBillsOptions = {
  limit?: number;
  offset?: number;
};

export async function findBills(
  options: FindBillsOptions = {},
): Promise<Array<Bill>> {
  const { limit = Infinity, offset = 0 } = options;
  const from = offset + 1;
  const to = Number.isInteger(limit) ? offset + limit : undefined;
  const parser = buildParser({ from, to });
  const result: Array<Bill> = [];
  for await (const bill of parser) {
    result.push(bill);
  }
  return result;
}

export async function findBillsByIds(
  ids: Iterable<Bill['id']>,
): Promise<Array<Bill>> {
  const parser = buildParser();
  const result: Array<Bill> = [];
  const idsArr = Array.from(ids);
  for await (const bill of parser) {
    if (idsArr.includes(bill.id)) {
      result.push(bill);
    }
  }
  return result;
}

export async function findBillsBySponsorIds(
  sponsorIds: Iterable<Bill['sponsorId']>,
): Promise<Array<Bill>> {
  const parser = buildParser();
  const result: Array<Bill> = [];
  const sponsorIdsArr = Array.from(sponsorIds);
  for await (const bill of parser) {
    if (sponsorIdsArr.includes(bill.sponsorId)) {
      result.push(bill);
    }
  }
  return result;
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
