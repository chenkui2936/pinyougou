package com.pinyougou.sellergoods.service;

import java.util.List;
import java.util.Map;

import com.pinyougou.pojo.TbBrand;

import entity.PageResult;

public interface BrandService {
public List<TbBrand> findAll();
public PageResult findPage(int pageNum,int pageSize);
public void add(TbBrand tbBrand);
public void update(TbBrand tbBrand);
public TbBrand findOne(Long id);
public void delete(Long [] id);
public PageResult findPage(TbBrand brand,int PageNum,int pageSize);
List<Map> slectOptionList();
}
