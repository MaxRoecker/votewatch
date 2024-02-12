import type { Options as ParseOptions, Parser } from 'csv-parse';
import { createReadStream } from 'node:fs';
import { parse } from 'csv-parse';
import voteResultsCSV from './vote_results.csv';
import votesCSV from './votes.csv';

export type VoteResult = {
  id: string;
  legislatorId: string;
  voteId: string;
  voteType: 1 | 2;
};

export type Vote = {
  id: string;
  billId: string;
};

export type FindVotesOptions = {
  limit?: number;
  offset?: number;
};

export async function findVotes(
  options: FindVotesOptions = {},
): Promise<Array<Vote>> {
  const { limit = Infinity, offset = 0 } = options;
  const from = offset + 1;
  const to = Number.isInteger(limit) ? offset + limit : undefined;
  const parser = buildVoteParser({ from, to });
  const result: Array<Vote> = [];
  for await (const vote of parser) {
    result.push(vote);
  }
  return result;
}

export async function findVoteByIds(
  ids: Iterable<Vote['id']>,
): Promise<Array<Vote>> {
  const parser = buildVoteParser();
  const result: Array<Vote> = [];
  const idsArr = Array.from(ids);
  for await (const vote of parser) {
    if (idsArr.includes(vote.id)) {
      result.push(vote);
    }
  }
  return result;
}

export async function findVoteByBillIds(
  billIds: Iterable<Vote['billId']>,
): Promise<Array<Vote>> {
  const parser = buildVoteParser();
  const result: Array<Vote> = [];
  const billIdsArr = Array.from(billIds);
  for await (const vote of parser) {
    if (billIdsArr.includes(vote.billId)) {
      result.push(vote);
    }
  }
  return result;
}

export async function findVoteResultsByVoteIds(
  voteIds: Iterable<VoteResult['voteId']>,
): Promise<Array<VoteResult>> {
  const parser = buildVoteResultParser();
  const voteIdsArr = Array.from(voteIds);
  const voteResults: Array<VoteResult> = [];
  for await (const voteResult of parser) {
    if (voteIdsArr.includes(voteResult.voteId)) {
      voteResults.push(voteResult);
    }
  }
  return voteResults;
}

export async function findVoteResultsByLegislatorIds(
  legislatorIds: Iterable<VoteResult['legislatorId']>,
): Promise<Array<VoteResult>> {
  const parser = buildVoteResultParser();
  const voteResults: Array<VoteResult> = [];
  const legislatorIdsArr = Array.from(legislatorIds);
  for await (const voteResult of parser) {
    if (legislatorIdsArr.includes(voteResult.legislatorId)) {
      voteResults.push(voteResult);
    }
  }
  return voteResults;
}

function buildVoteParser(options: ParseOptions = {}): Parser {
  const columns = true;
  const trim = true;
  const onRecord = parseVoteRecord;
  const parseOptions = { columns, trim, onRecord, ...options };
  const filepath = new URL(`../public/${votesCSV}`, import.meta.url);
  return createReadStream(filepath.pathname).pipe(parse(parseOptions));
}

function buildVoteResultParser(options: ParseOptions = {}): Parser {
  const columns = true;
  const trim = true;
  const onRecord = parseVoteResultRecord;
  const parseOptions = { columns, trim, onRecord, ...options };
  const filepath = new URL(`../public/${voteResultsCSV}`, import.meta.url);
  return createReadStream(filepath.pathname).pipe(parse(parseOptions));
}

function parseVoteRecord(record: Record<string, string>): Vote {
  return {
    id: record['id'],
    billId: record['bill_id'],
  };
}

function parseVoteResultRecord(record: Record<string, string>): VoteResult {
  return {
    id: record['id'],
    legislatorId: record['legislator_id'],
    voteId: record['vote_id'],
    voteType: Number.parseInt(record['vote_type']) as 1 | 2,
  };
}
