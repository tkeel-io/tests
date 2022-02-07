import {ironMan, keel} from "../data";
import {routerData} from "./router_data";
import {request} from "../../src/init";
import {entity_data, implicateID} from "./enetity_data";

export const entityCase = "test for core entity";

const _none_url = "http://localhost"

/**
 * Create Entity
 */
it("create entity",(done) => {
    let createUrl = new URL(_none_url)
    createUrl.pathname = routerData.createEntity.url
    createUrl.searchParams.append("id", entity_data.create_properties.id)
    let u = createUrl.toString().replace(_none_url, "")
    request.post(u)
        .header("Owner", entity_data.create_properties.owner)
        .header("Type", entity_data.create_properties.type)
        .header("Source", entity_data.create_properties.source)
        .header("Content-Type", "application/json")
        .send(entity_data.create_properties.content)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.id).toBe(entity_data.create_properties.id);
            expect(res.body.owner).toBe(entity_data.create_properties.owner);
            expect(res.body.type).toBe(entity_data.create_properties.type);
            expect(res.body.config).toBe({});
            expect(res.body.properties).toBe(entity_data.create_properties.content);
            entity_data.id = res.body.id;
            done();
        });
})

/**
 * Get Entity
 */
it("get entity", (done) => {
    request.get(implicateID(routerData.getEntity.url))
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.owner).toBe(entity_data.id);
            expect(res.body.properties).toBe(entity_data.create_properties);
            done();
        });
})

/**
 * List Entity
 */
it("list entity", (done) => {
    request.get(routerData.listEntities)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.total).toBe(1);
            expect(res.body.page).toBe(1);
            expect(res.body.limit).toBe(1);
            expect(res.body.offset).toBe(1);
            expect(res.body.items[0]).toBe(entity_data.create_properties);
            done();
        })
})

/**
 * Update Entity
 */
it("update entity", (done) => {
    request.put(implicateID(routerData.updateEntity.url))
        .header("Owner", entity_data.update_properties.owner)
        .header("Type", entity_data.update_properties.type)
        .header("Source", entity_data.update_properties.source)
        .header("Content-Type", "application/json")
        .send(entity_data.update_properties.content)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.id).toBe(entity_data.update_properties.id);
            expect(res.body.properties).toBe(entity_data.update_properties);
            done();
        });
})

/**
 * Patch Entity
 */
it("patch entity", (done) => {
    request.patch(implicateID(routerData.patchEntity.url))
        .header("Owner", entity_data.update_properties.owner)
        .header("Type", entity_data.update_properties.type)
        .header("Source", entity_data.update_properties.source)
        .header("Content-Type", "application/json")
        .send(entity_data.patch_properties.content)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.id).toBe(entity_data.id);
            expect(res.body.properties).toBe(entity_data.patch_properties.should_be);
            done();
        });
})

/**
 * Set Config
 */
it("set config", (done) => {
    let setUrl = new URL(_none_url)
    setUrl.pathname = routerData.setConfig.url
    setUrl.searchParams.append("type", entity_data.set_config.type)
    setUrl.searchParams.append("owner", entity_data.set_config.owner)
    setUrl.searchParams.append("source", entity_data.set_config.source)
    let u = setUrl.toString().replace(_none_url, "")
    request.post(implicateID(u))
        .header("Content-Type", "application/json")
        .send(entity_data.set_config.content)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.id).toBe(entity_data.id);
            expect(res.body.configs).toBe(entity_data.set_config.content[0].define.fields);
            done();
        });
})


/**
 * Delete Entity
 */
it("delete entity", (done) => {
    request.delete(implicateID(routerData.deleteEntity.url))
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.id).toBe(entity_data.id);
            expect(res.body.status).toBe("deleted")
            done();
        });
})
