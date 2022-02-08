import {ironMan} from "../data";
import {entityRouters} from "./router_data";
import {request} from "../../src/init";
import {entity_data, implicateID} from "./entity_data";

export const entityTest = "test for core entity";

const _none_url = "http://localhost"

/**
 * Create Entity
 */
it("createEntity",(done) => {
    let createUrl = new URL(_none_url)
    createUrl.pathname = entityRouters.createEntity.url
    createUrl.searchParams.append("id", entity_data.create_properties.id)
    let u = createUrl.toString().replace(_none_url, "")
    request.post(u)
        .set("Owner", entity_data.create_properties.owner)
        .set("Type", entity_data.create_properties.type)
        .set("Source", entity_data.create_properties.source)
        .set("Content-Type", "application/json")
        .set("authorization", ironMan.authorization)
        .send(entity_data.create_properties.content)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let body = JSON.parse(res.text)
            expect(body.id).toBe(entity_data.create_properties.id);
            expect(body.owner).toBe(entity_data.create_properties.owner);
            expect(body.type).toBe(entity_data.create_properties.type);
            expect(body.config).toBe(undefined);
            expect(JSON.stringify(body.properties)).toBe(JSON.stringify(entity_data.create_properties.content));
            entity_data.id = body.id;
            done();
        });
})

/**
 * Get Entity
 */
it("getEntity", (done) => {
    request.get(implicateID(entityRouters.getEntity.url))
        .set("authorization", ironMan.authorization)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let body = JSON.parse(res.text)
            expect(body.owner).toBe(entity_data.create_properties.owner);
            expect(JSON.stringify(body.properties)).toBe(JSON.stringify(entity_data.create_properties.content));
            done();
        });
})

/**
 * Search Entity
 */
it("searchEntity", (done) => {
    request.post(entityRouters.searchEntities.url)
        .set("authorization", ironMan.authorization)
        .send(entity_data.search_type.request)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let body = JSON.parse(res.text)
            expect(body.total).toBe(1);
            expect(body.limit).toBe(entity_data.search_type.request.page.limit);
            expect(body.items[0]).toHaveProperty("properties");
            expect(JSON.stringify(body.items[0].properties)).toBe(JSON.stringify(entity_data.search_type.should_be.properties));
            done();
        })
})

/**
 * Update Entity
 */
it("updateEntity", (done) => {
    request.put(implicateID(entityRouters.updateEntity.url))
        .set("authorization", ironMan.authorization)
        .set("Owner", entity_data.update_properties.owner)
        .set("Type", entity_data.update_properties.type)
        .set("Source", entity_data.update_properties.source)
        .set("Content-Type", "application/json")
        .send(entity_data.update_properties.content)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let body = JSON.parse(res.text)
            expect(body.id).toBe(entity_data.update_properties.id);
            expect(JSON.stringify(body.properties)).toBe(JSON.stringify(entity_data.update_properties.content));
            done();
        });
})

/**
 * Patch Entity
 */
it("patchEntity", (done) => {
    request.patch(implicateID(entityRouters.patchEntity.url))
        .set("Owner", entity_data.update_properties.owner)
        .set("Type", entity_data.update_properties.type)
        .set("Source", entity_data.update_properties.source)
        .set("Content-Type", "application/json")
        .set("authorization", ironMan.authorization)
        .send(entity_data.patch_properties.content)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let body = JSON.parse(res.text)
            expect(body.id).toBe(entity_data.id);
            expect(body.owner).toBe(entity_data.update_properties.owner);
            expect(body.type).toBe(entity_data.update_properties.type);
            expect(body.source).toBe(entity_data.update_properties.source);
            expect(JSON.stringify(body.properties)).toBe(JSON.stringify(entity_data.patch_properties.should_be.content));
            done();
        });
})

/**
 * Set Config
 */
it("setConfig", (done) => {
    let setUrl = new URL(_none_url)
    setUrl.pathname = entityRouters.setConfig.url
    setUrl.searchParams.append("type", entity_data.set_config.type)
    setUrl.searchParams.append("owner", entity_data.set_config.owner)
    setUrl.searchParams.append("source", entity_data.set_config.source)
    let u = implicateID(setUrl.toString().replace(_none_url, ""))
    request.post(u)
        .set("Content-Type", "application/json")
        .set("authorization", ironMan.authorization)
        .send(entity_data.set_config.content)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let body = JSON.parse(res.text)
            expect(body.id).toBe(entity_data.id);
            expect(JSON.stringify(body.configs)).toBe(JSON.stringify(entity_data.set_config.content[0].define.fields));
            done();
        });
})

/**
 * Patch Config
 */
describe("patchConfig", ()=>{
    it("append_cpu_used", (done) => {
        let appendCpuUsedUrl = new URL(_none_url)
        appendCpuUsedUrl.pathname = entityRouters.patchConfig.url
        appendCpuUsedUrl.searchParams.append("type", entity_data.patch_config.append_cpu_used.type)
        appendCpuUsedUrl.searchParams.append("owner", entity_data.patch_config.append_cpu_used.owner)
        appendCpuUsedUrl.searchParams.append("source", entity_data.patch_config.append_cpu_used.source)
        let u = implicateID(appendCpuUsedUrl.toString().replace(_none_url, ""))
        request.post(u)
            .set("Content-Type", "application/json")
            .set("authorization", ironMan.authorization)
            .send(entity_data.patch_config.append_cpu_used.content)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                let body = JSON.parse(res.text)
                expect(body.id).toBe(entity_data.id);
                expect(JSON.stringify(body.configs)).toBe(JSON.stringify(entity_data.patch_config.append_cpu_used))
                done();
            });
    })
    it("remove_cpu_used", (done) => {
        let removeCpuUsedUrl = new URL(_none_url)
        removeCpuUsedUrl.pathname = entityRouters.patchConfig.url
        removeCpuUsedUrl.searchParams.append("type", entity_data.patch_config.remove_cpu_used.type)
        removeCpuUsedUrl.searchParams.append("owner", entity_data.patch_config.remove_cpu_used.owner)
        removeCpuUsedUrl.searchParams.append("source", entity_data.patch_config.remove_cpu_used.source)
        let u = implicateID(removeCpuUsedUrl.toString().replace(_none_url, ""))
        request.post(u)
            .set("Content-Type", "application/json")
            .set("authorization", ironMan.authorization)
            .send(entity_data.patch_config.remove_cpu_used.content)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                let body = JSON.parse(res.text)
                expect(body.id).toBe(entity_data.id);
                expect(JSON.stringify(body.configs)).toBe(JSON.stringify(entity_data.patch_config.remove_cpu_used));
                done();
            });
    })
    it("append_metrics_mem_used", (done) => {
        let appendMetricsMemUsedUrl = new URL(_none_url)
        appendMetricsMemUsedUrl.pathname = entityRouters.patchConfig.url
        appendMetricsMemUsedUrl.searchParams.append("type", entity_data.patch_config.append_metrics_mem_used.type)
        appendMetricsMemUsedUrl.searchParams.append("owner", entity_data.patch_config.append_metrics_mem_used.owner)
        appendMetricsMemUsedUrl.searchParams.append("source", entity_data.patch_config.append_metrics_mem_used.source)
        let u = implicateID(appendMetricsMemUsedUrl.toString().replace(_none_url, ""))
        request.post(u)
            .set("Content-Type", "application/json")
            .set("authorization", ironMan.authorization)
            .send(entity_data.patch_config.append_metrics_mem_used.content)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                let body = JSON.parse(res.text)
                expect(body.id).toBe(entity_data.id);
                expect(JSON.stringify(body.configs)).toBe(JSON.stringify(entity_data.patch_config.append_metrics_mem_used));
                done();
            });
    })
    it("copy_metrics_mem_used", (done) => {
        let copyMetricsMemUsedUrl = new URL(_none_url)
        copyMetricsMemUsedUrl.pathname = entityRouters.patchConfig.url
        copyMetricsMemUsedUrl.searchParams.append("type", entity_data.patch_config.copy_metrics_mem_used.type)
        copyMetricsMemUsedUrl.searchParams.append("owner", entity_data.patch_config.copy_metrics_mem_used.owner)
        copyMetricsMemUsedUrl.searchParams.append("source", entity_data.patch_config.copy_metrics_mem_used.source)
        let u = implicateID(copyMetricsMemUsedUrl.toString().replace(_none_url, ""))
        request.post(u)
            .set("Content-Type", "application/json")
            .set("authorization", ironMan.authorization)
            .send(entity_data.patch_config.copy_metrics_mem_used.content)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                let body = JSON.parse(res.text)
                expect(body.id).toBe(entity_data.id);
                expect(JSON.stringify(body.configs)).toBe(JSON.stringify(entity_data.patch_config.copy_metrics_mem_used));
                done();
            });
    })
    it("remove_metrics_mem_used", (done) => {
        let removeMetricsMemUsedUrl = new URL(_none_url)
        removeMetricsMemUsedUrl.pathname = entityRouters.patchConfig.url
        removeMetricsMemUsedUrl.searchParams.append("type", entity_data.patch_config.remove_metrics_mem_used.type)
        removeMetricsMemUsedUrl.searchParams.append("owner", entity_data.patch_config.remove_metrics_mem_used.owner)
        removeMetricsMemUsedUrl.searchParams.append("source", entity_data.patch_config.remove_metrics_mem_used.source)
        let u = implicateID(removeMetricsMemUsedUrl.toString().replace(_none_url, ""))
        request.post(u)
            .set("Content-Type", "application/json")
            .set("authorization", ironMan.authorization)
            .send(entity_data.patch_config.remove_metrics_mem_used.content)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                let body = JSON.parse(res.text)
                expect(body.id).toBe(entity_data.id);
                expect(JSON.stringify(body.configs)).toBe(JSON.stringify(entity_data.patch_config.remove_metrics_mem_used));
                done();
            });
    })
    it("make_path_if_not_exist", (done) => {
        let makePathUrl = new URL(_none_url)
        makePathUrl.pathname = entityRouters.patchConfig.url
        makePathUrl.searchParams.append("type", entity_data.patch_config.make_path_if_not_exist.type)
        makePathUrl.searchParams.append("owner", entity_data.patch_config.make_path_if_not_exist.owner)
        makePathUrl.searchParams.append("source", entity_data.patch_config.make_path_if_not_exist.source)
        let u = implicateID(makePathUrl.toString().replace(_none_url, ""))
        request.post(u)
            .set("Content-Type", "application/json")
            .set("authorization", ironMan.authorization)
            .send(entity_data.patch_config.make_path_if_not_exist.content)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                let body = JSON.parse(res.text)
                expect(body.id).toBe(entity_data.id);
                expect(JSON.stringify(body.configs)).toBe(JSON.stringify(entity_data.patch_config.make_path_if_not_exist));
                done();
            });
    })
    it("add_root_config", (done) => {
        let addRootConfig = new URL(_none_url)
        addRootConfig.pathname = entityRouters.patchConfig.url
        addRootConfig.searchParams.append("type", entity_data.patch_config.add_root_config.type)
        addRootConfig.searchParams.append("owner", entity_data.patch_config.add_root_config.owner)
        addRootConfig.searchParams.append("source", entity_data.patch_config.add_root_config.source)
        let u = implicateID(addRootConfig.toString().replace(_none_url, ""))
        request.post(u)
            .set("Content-Type", "application/json")
            .set("authorization", ironMan.authorization)
            .send(entity_data.patch_config.add_root_config.content)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                let body = JSON.parse(res.text)
                expect(body.id).toBe(entity_data.id);
                expect(JSON.stringify(body.configs)).toBe(JSON.stringify(entity_data.patch_config.add_root_config));
                done();
            });
    })
    it("remove", (done) => {
        let removeUrl = new URL(_none_url)
        removeUrl.pathname = entityRouters.patchConfig.url
        removeUrl.searchParams.append("type", entity_data.patch_config.remove.type)
        removeUrl.searchParams.append("owner", entity_data.patch_config.remove.owner)
        removeUrl.searchParams.append("source", entity_data.patch_config.remove.source)
        let u = implicateID(removeUrl.toString().replace(_none_url, ""))
        request.post(u)
            .set("Content-Type", "application/json")
            .set("authorization", ironMan.authorization)
            .send(entity_data.patch_config.remove.content)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                let body = JSON.parse(res.text)
                expect(body.id).toBe(entity_data.id);
                expect(JSON.stringify(body.configs)).toBe(JSON.stringify(entity_data.patch_config.remove));
                done();
            });
    })
})

/**
 * Append Config
 */
it("appendConfig", (done) => {
    let appendConfigUrl = new URL(_none_url)
    appendConfigUrl.pathname = entityRouters.appendConfig.url
    appendConfigUrl.searchParams.append("type", entity_data.append_config.type)
    appendConfigUrl.searchParams.append("owner", entity_data.append_config.owner)
    appendConfigUrl.searchParams.append("source", entity_data.append_config.source)
    let u = implicateID(appendConfigUrl.toString().replace(_none_url, ""))
    request.put(u)
        .set("Content-Type", "application/json")
        .set("authorization", ironMan.authorization)
        .send(entity_data.append_config.content)
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let body = JSON.parse(res.text)
            expect(JSON.stringify(body.configs)).toBe(JSON.stringify(entity_data.append_config));
            done();
        });
})

/**
 * Query Config
 */
it("queryConfig", (done) => {
    let queryConfigUrl = new URL(_none_url)
    queryConfigUrl.pathname = entityRouters.removeConfig.url
    queryConfigUrl.searchParams.append("type", entity_data.query_config.type)
    queryConfigUrl.searchParams.append("owner", entity_data.query_config.owner)
    queryConfigUrl.searchParams.append("source", entity_data.query_config.source)
    queryConfigUrl.searchParams.append("property_ids", entity_data.query_config.property_ids.join(","))
    let u = implicateID(queryConfigUrl.toString().replace(_none_url, ""))
    request.get(u)
        .set("Content-Type", "application/json")
        .set("authorization", ironMan.authorization)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let body = JSON.parse(res.text)
            expect(JSON.stringify(body.configs)).toBe(JSON.stringify(entity_data.append_config));
            done();
        });
})

/**
 * Remove Config
 */
it("removeConfig", (done) => {
    let removeConfigUrl = new URL(_none_url)
    removeConfigUrl.pathname = entityRouters.removeConfig.url
    removeConfigUrl.searchParams.append("type", entity_data.remove_config.type)
    removeConfigUrl.searchParams.append("owner", entity_data.remove_config.owner)
    removeConfigUrl.searchParams.append("source", entity_data.remove_config.source)
    removeConfigUrl.searchParams.append("property_ids", entity_data.remove_config.property_ids.join(","))
    let u = implicateID(removeConfigUrl.toString().replace(_none_url, ""))
    request.delete(u)
        .set("Content-Type", "application/json")
        .set("authorization", ironMan.authorization)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let body = JSON.parse(res.text)
            expect(JSON.stringify(body.configs)).toBe(JSON.stringify(entity_data.append_config));
            done();
        });
})

/**
 * Delete Entity
 */
it("deleteEntity", (done) => {
    request.delete(implicateID(entityRouters.deleteEntity.url))
        .set("authorization", ironMan.authorization)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let body = JSON.parse(res.text)
            expect(body.id).toBe(entity_data.id);
            expect(body.status).toBe("ok")
            done();
        });
})
