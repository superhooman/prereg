import express, { Request, Response } from 'express';
import debug from 'debug';
import { createRequest } from './request';

const errorLog = debug('errors');

const serializeJSON = (json: Record<string, string | number>) => {
  const result = [];
  for (let x in json) {
    result.push(`${encodeURIComponent(x)}=${encodeURIComponent(json[x])}`);
  }
  return result.join("&")
}

const handleError = (res: Response) => res.status(500).json({
	error: 'Server Error',
});

const URL = 'https://registrar.nu.edu.kz/my-registrar/public-course-catalog/json';

const simpleRequest = (method: string) => (_: Request, res: Response) => createRequest({
	url: URL,
	params: {
		method,
	},
}).then(response => {
	res.json(response.data);
}).catch(error => {
	errorLog(error);
	handleError(res);
});

export const APIRouter = express.Router();

APIRouter.get('/getSemesters', simpleRequest('getSemesters'));

APIRouter.get('/getSearchData', (req, res) => {
	const page = String(req.query.page) || 1;
	const semester = String(req.query.semester) || '-1';
	const search = String(req.query.q) || '';
	createRequest({
		url: URL,
		method: "POST",
		data: serializeJSON({
			'method': 'getSearchData',
			'searchParams[formSimple]': 'false',
			'searchParams[limit]': 10,
			'searchParams[page]': page,
			'searchParams[start]': 0,
			'searchParams[quickSearch]': search,
			'searchParams[sortField]': -1,
			'searchParams[sortDescending]': -1,
			'searchParams[semester]': semester,
			'searchParams[schools]': '',
			'searchParams[departments]': '',
			'searchParams[levels]': '',
			'searchParams[subjects]': '',
			'searchParams[instructors]': '',
			'searchParams[breadths]': '',
			'searchParams[abbrNum]': '',
			'searchParams[credit]': '',
		}),
	}).then(response => {
		res.json(response.data);
	}).catch(error => {
		errorLog(error);
		handleError(res);
	});
});

APIRouter.get('/getSchedule', (req, res) => {
	const courseId = String(req.query.courseId);
	const termId = String(req.query.termId);
	createRequest({
		url: URL,
		params: {
			method: 'getSchedule',
			courseId,
			termId,
		},
	}).then(response => {
		res.json(response.data);
	}).catch(error => {
		errorLog(error);
		handleError(res);
	});
});
