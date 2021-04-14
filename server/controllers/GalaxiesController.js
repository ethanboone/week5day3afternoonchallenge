// import { assignmentsService } from "../services/AssignmentsService";
import { galaxiesService } from "../services/GalaxiesService";
// import { cohortStudentsService } from "../services/CohortStudentsService";
import BaseController from "../utils/BaseController";

export class GalaxiesController extends BaseController {
    constructor() {
        super("api/galaxies");
        this.router
            .get("", this.getAll)
            .get("/:id", this.getById)
            .get("/:id/stars", this.getstarsByGalaxyId)
            .get("/:id/planets", this.getplanetsByGalaxyId)
            .post("", this.create)
            .put("/:id", this.edit)
            .delete("/:id", this.delete)
    }



    /**
     * Sends found cohorts to a client by request
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     */
    async getAll(req, res, next) {
        try {
            const galaxy = await galaxyService.find(req.query)
            return res.send(galaxy);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Sends found cohort to a client by request provided the Id from params
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     */
    async getById(req, res, next) {
        try {
            const galaxy = await galaxyService.findOne({ _id: req.params.id })
            return res.send(galaxy);
        } catch (error) {
            next(error);
        }
    }
    /**
     * Sends found assignments to a client by request provided the Id from params for the cohort
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     */
    async getstarsByGalaxyId(req, res, next) {
        try {
            const stars = await starsService.find({ cohort: req.params.id })
            return res.send(stars)
        } catch (error) {
            next(error)
        }
    }

    /**
   * Sends found assignments to a client by request provided the Id from params for the cohort
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @param {import("express").NextFunction} next 
   */
    async getplanetsByGalaxyId(req, res, next) {
        try {
            const assignments = await cohortStudentsService.findStudents({ cohort: req.params.id })
            return res.send(assignments)
        } catch (error) {
            next(error)
        }
    }


    /**
     * Creates a cohort from request body and returns it
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     */
    async create(req, res, next) {
        try {
            const cohort = await cohortsService.create(req.body)
            res.send(cohort);
        } catch (error) {
            next(error);
        }
    }

    async edit(req, res, next) {
        try {
            req.body.id = req.params.id
            let data = await cohortsService.edit(req.body)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }
    async delete(req, res, next) {
        try {
            let data = await cohortsService.delete(req.params.id)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }
}