import express, { Router, RouterOptions } from 'express';

const routes: any = []

export const router = Router()
for (const route of routes)
  router.use('/', route)
