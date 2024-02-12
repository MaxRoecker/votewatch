import type { Options as ParseOptions, Parser } from 'csv-parse';
import { createReadStream } from 'node:fs';
import { parse } from 'csv-parse';
import legislatorsCSV from './legislators.csv';

export type Legislator = {
  id: string;
  name: string;
  displayName: string;
  party: 'R' | 'D';
  state: string;
  district: string;
};

export type ListLegislatorsOptions = {
  limit?: number;
  offset?: number;
};

export async function listLegislators(
  options: ListLegislatorsOptions = {},
): Promise<Array<Legislator>> {
  const { limit = Infinity, offset = 0 } = options;
  const from = offset + 1;
  const to = Number.isInteger(limit) ? offset + limit : undefined;
  const parser = buildParser({ from, to });
  const legislators: Array<Legislator> = [];
  for await (const legislator of parser) {
    legislators.push(legislator);
  }
  return legislators;
}

export async function retrieveLegislator(
  id: string,
): Promise<Legislator | undefined> {
  const parser = buildParser();
  for await (const legislator of parser) {
    if (legislator.id === id) return legislator;
  }
  return undefined;
}

function buildParser(options: ParseOptions = {}): Parser {
  const columns = true;
  const trim = true;
  const onRecord = parseLegislatorRecord;
  const parseOptions = { columns, trim, onRecord, ...options };
  const filepath = new URL(`../public/${legislatorsCSV}`, import.meta.url);
  return createReadStream(filepath.pathname).pipe(parse(parseOptions));
}

function parseLegislatorRecord(record: Record<string, string>): Legislator {
  const start = record['name'].indexOf(' ');
  const end = record['name'].lastIndexOf(' ');
  const name = record['name'].slice(start + 1, end).trim();
  const displayName = record['name'].slice(0, end).trim();
  const info = record['name'].slice(end + 1).trim();
  const infoReg = /\((?<party>R|D)-(?<state>[A-Z]{2})-(?<district>\d+)\)/g;
  const result = infoReg.exec(info);
  if (result == null) {
    throw new Error('Invalid legislator record');
  }
  const { party, state, district } = result.groups!;
  return {
    id: record['id'],
    party: party as 'R' | 'D',
    displayName,
    name,
    state,
    district,
  };
}
